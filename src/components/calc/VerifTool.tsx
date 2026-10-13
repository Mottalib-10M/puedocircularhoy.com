/**
 * Verificación vehicular CDMX : dernier chiffre → bimestre du semestre, date limite, état aujourd'hui, coût et
 * multa extemporánea calculés depuis l'UMA (params-2026.json > mx.verif). Premier rendu : __BUILD_DAY__.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Rows, Verdict, digitOptions, type Tone } from './parts';
import { colorDe, costoVerif, multaVerif, verifMeses, type MxParams, type VerifParams } from '../../lib/engine/mx';
import { daysInMonth, iso, todayIn } from '../../lib/engine/dates';
import { fecha, mes, mxn } from '../../lib/fmt';
import { readParams, num, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
interface Props { p: MxParams; v: VerifParams & { vigencia: { desde: string; hasta: string } }; methodHref: string; idPrefix?: string; digit?: number }

export default function VerifTool({ p, v, methodHref, idPrefix = 'ver', digit: d0 = 1 }: Props) {
  const [digit, setDigit] = useState(d0);
  const [hoy, setHoy] = useState(__BUILD_DAY__);
  useEffect(() => { setDigit(num(readParams(window.location.search), 'placa', d0)); setHoy(todayIn('America/Mexico_City')); }, []);
  useEffect(() => { updateURL({ placa: digit }); }, [digit]);
  const r = useMemo(() => {
    const color = colorDe(p, digit);
    const [y] = hoy.split('-').map(Number);
    const sem: 1 | 2 = hoy.slice(5, 7) <= '06' ? 1 : 2;
    const [m1, m2] = verifMeses(v, color, sem);
    const desde = iso(y, m1, 1), hasta = iso(y, m2, daysInMonth(y, m2));
    const estado: 'antes' | 'ahora' | 'vencido' = hoy < desde ? 'antes' : hoy <= hasta ? 'ahora' : 'vencido';
    return { color, sem, m1, m2, desde, hasta, estado, prorroga: v.prorroga15[color] };
  }, [p, v, digit, hoy]);
  const fuera = hoy > v.vigencia.hasta;
  const [val, tone]: [string, Tone] = fuera ? ['Programa no publicado', 'na'] : r.estado === 'ahora' ? ['Te toca verificar', 'warn'] : r.estado === 'antes' ? [`Verificas en ${mes(r.m1)}`, 'si'] : ['Plazo vencido', 'no'];
  const sub = fuera ? 'El programa del semestre siguiente aún no está en la Gaceta.' : r.estado === 'ahora' ? `Tienes hasta el ${fecha(r.hasta)}.` : r.estado === 'antes' ? `Tu periodo va del ${fecha(r.desde)} al ${fecha(r.hasta)}.` : `Tu periodo terminó el ${fecha(r.hasta)}: verificar ahora cuesta la multa.`;
  const rows: Array<[string, string]> = [
    ['Engomado', `${r.color} (terminación ${digit})`],
    [`Periodo del ${r.sem}.er semestre`, `${mes(r.m1)} y ${mes(r.m2)}`],
    ['Costo de la verificación', `${mxn(costoVerif(v), 0)} con IVA`],
    ['Multa por verificar tarde', mxn(multaVerif(v), 0)],
  ];
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form className="grid grid-cols-1 content-start gap-y-3" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-placa`} label="Último número de la placa" value={String(digit)} onChange={(x) => setDigit(Number(x))} options={digitOptions()} help="Placa sin números: periodo de la terminación 9 o 0." />
      </form>
      <Verdict label={`Verificación en la Ciudad de México, terminación ${digit}`} value={val} tone={tone} sub={sub} methodHref={methodHref} note={`Programa del 2.º semestre de 2026, Gaceta Oficial del 1 de julio de 2026; prórroga de 15 días hasta el ${fecha(r.prorroga)} solo en los casos que prevé el programa.`}>
        <Rows rows={rows} />
      </Verdict>
    </div>
  );
}
