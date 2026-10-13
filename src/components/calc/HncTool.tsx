/**
 * Hoy No Circula : dernier chiffre, holograma, contingence (scénario) → aujourd'hui, demain, prochain jour sans
 * circuler. Premier rendu : __BUILD_DAY__ (RECETTE §17.5) ; après montage, le jour à Mexico et le lien partagé.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Rows, Verdict, digitOptions, type Tone } from './parts';
import { mxDia, mxProximo, colorDe, type Holo, type MxParams, type MxResultado, type Color, type Contingencia } from '../../lib/engine/mx';
import { addDays, todayIn, weekday } from '../../lib/engine/dates';
import { fechaDia } from '../../lib/fmt';
import { readParams, str, num, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
interface Props { p: MxParams; holo?: Holo; digit?: number; methodHref: string; calHref?: string; contHref?: string; idPrefix?: string; manana?: boolean }

export const HOLOS: Array<{ value: Holo; label: string }> = [
  { value: '00', label: 'Holograma 00' }, { value: '0', label: 'Holograma 0' }, { value: '1', label: 'Holograma 1' }, { value: '2', label: 'Holograma 2' },
  { value: 'exento', label: 'Exento (eléctrico o híbrido)' }, { value: 'foraneo', label: 'Placa de otro estado sin holograma' }, { value: 'pase', label: 'Con Pase Turístico' }, { value: 'moto', label: 'Motocicleta' },
];
const COLOR_TXT: Record<Color, string> = { amarillo: 'amarillo', rosa: 'rosa', rojo: 'rojo', verde: 'verde', azul: 'azul' };
const h12 = (t: string) => { const [H, M] = t.split(':').map(Number); return `${H}:${String(M).padStart(2, '0')}`; };

export function mxTxt(r: MxResultado): [string, Tone] {
  if (r.circula === true) return ['Sí circula', 'si'];
  if (r.circula === false) return ['No circula', 'no'];
  return r.motivo === 'foraneo-manana' ? ['Circula desde las 11:00', 'warn'] : ['Depende del comunicado', 'warn'];
}
const MOTIVO: Record<string, string> = {
  exento: 'Tu holograma o tipo de vehículo está exento del Hoy No Circula.', domingo: 'Los domingos no hay Hoy No Circula.', libre: 'Hoy no le toca a tu terminación.',
  'dia-engomado': 'Es el día de tu engomado.', 'sabado-holo1': 'Este sábado descansa tu terminación con holograma 1.', 'sabado-holo2': 'El holograma 2 y las placas foráneas sin holograma no circulan ningún sábado.',
  'quinto-sabado': 'Quinto sábado del mes: el holograma 1 puede circular.', 'foraneo-manana': 'Sin holograma reconocido no circulas de lunes a viernes de 5:00 a 11:00.',
  'cont-holo2': 'Contingencia: no circulan el holograma 2, las placas foráneas sin holograma y los pases turísticos.', 'cont-holo1': 'Contingencia: la CAMe restringió tu terminación con holograma 1.',
  'cont-color': 'Contingencia: los hologramas 0 y 00 dejan de circular el día de su engomado.', 'cont-moto': 'Fase II: la mitad de las motos deja de circular según su terminación.',
  'cont-depende': 'El comunicado de la CAMe dice qué terminación o qué engomado descansa: elígelo arriba.',
};

export default function HncTool({ p, holo: h0 = '1', digit: d0 = 5, methodHref, calHref, contHref, idPrefix = 'hnc', manana = false }: Props) {
  const [digit, setDigit] = useState(d0);
  const [holo, setHolo] = useState<Holo>(h0);
  const [cont, setCont] = useState<'no' | '1' | '2'>('no');
  const [h1, setH1] = useState<'' | 'par' | 'non'>('');
  const [cf, setCf] = useState<'' | Color>('');
  const [hoy, setHoy] = useState(__BUILD_DAY__);
  useEffect(() => {
    const u = readParams(window.location.search);
    setDigit(num(u, 'placa', d0));
    const hx = str(u, 'holo', h0); if (HOLOS.some((x) => x.value === hx)) setHolo(hx as Holo);
    setHoy(todayIn('America/Mexico_City'));
  }, []);
  useEffect(() => { updateURL({ placa: digit, holo }); }, [digit, holo]);
  const dia = manana ? addDays(hoy, 1) : hoy;
  const c: Contingencia | undefined = cont === 'no' ? undefined : { activa: true, fase: cont === '2' ? 2 : 1, holo1: h1 || undefined, colorFinde: cf || undefined };
  const r = useMemo(() => {
    const d = mxDia(p, dia, digit, holo, c);
    const next = mxDia(p, addDays(dia, 1), digit, holo);
    const prox = mxProximo(p, addDays(dia, 1), digit, holo, addDays);
    return { d, next, prox };
  }, [p, dia, digit, holo, cont, h1, cf]);
  const [v, tone] = mxTxt(r.d);
  const color = colorDe(p, digit);
  const finde = weekday(dia) === 0 || weekday(dia) === 6;
  const rows: Array<[string, string]> = [
    [`${manana ? 'Pasado mañana' : 'Mañana'}, ${fechaDia(addDays(dia, 1))}`, `${mxTxt(r.next)[0]} (sin contingencia)`],
    ['Próximo día sin circular', r.prox ? fechaDia(r.prox) : 'ninguno en las próximas semanas'],
    ['Tu engomado', `${COLOR_TXT[color]} (terminación ${digit})`],
  ];
  if (r.d.horas.length) rows.push(['Horario de la restricción', r.d.horas.map(([a, b]) => `${h12(a)} a ${h12(b)} h`).join(' y ')]);
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-placa`} label="Último número de la placa" value={String(digit)} onChange={(x) => setDigit(Number(x))} options={digitOptions()} />
        <SelectField id={`${idPrefix}-holo`} label="Holograma de verificación" value={holo} onChange={(x) => setHolo(x as Holo)} options={HOLOS} />
        <Toggle id={`${idPrefix}-cont`} label="¿Contingencia ambiental activa?" value={cont} onChange={(x) => setCont(x as 'no' | '1' | '2')} options={[{ value: 'no', label: 'No' }, { value: '1', label: 'Fase I' }, { value: '2', label: 'Fase II' }]} />
        {cont !== 'no' && (holo === '1' || holo === 'moto') && <SelectField id={`${idPrefix}-h1`} label="Terminación restringida hoy" value={h1} onChange={(x) => setH1(x as '' | 'par' | 'non')} options={[{ value: '', label: 'Según el comunicado…' }, { value: 'non', label: 'Nones: 1, 3, 5, 7, 9' }, { value: 'par', label: 'Pares: 0, 2, 4, 6, 8' }]} />}
        {cont !== 'no' && (holo === '0' || holo === '00') && finde && <SelectField id={`${idPrefix}-cf`} label="Engomado restringido hoy" value={cf} onChange={(x) => setCf(x as '' | Color)} options={[{ value: '', label: 'Según el comunicado…' }, ...(Object.keys(COLOR_TXT) as Color[]).map((k) => ({ value: k, label: `Engomado ${k}` }))]} />}
      </form>
      <Verdict label={`${manana ? 'Mañana' : 'Hoy'} ${fechaDia(dia)}, placa terminación ${digit}`} value={v} tone={tone} sub={MOTIVO[r.d.motivo]} methodHref={methodHref} note={cont === 'no' ? 'Sin contingencia ambiental. La CAMe la decide cada día: revisa su aviso antes de salir.' : 'Escenario de contingencia: las reglas del Programa de Contingencias de 2019 aplicadas a tu placa.'}>
        <Rows rows={rows} />
        <p className="mt-2 flex flex-wrap gap-x-4 text-sm">{calHref && <a className="font-medium text-accent-700 underline" href={calHref}>Calendario del mes</a>}{contHref && <a className="font-medium text-accent-700 underline" href={contHref}>¿Hay contingencia hoy?</a>}</p>
      </Verdict>
    </div>
  );
}
