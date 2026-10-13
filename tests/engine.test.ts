/**
 * Moteurs testés contre les textes officiels (RECETTE §17.4) : chaque cas cite l'article ou le communiqué.
 */
import { describe, it, expect } from 'vitest';
import P from '../src/data/params-2026.json';
import CO from '../src/data/co-ciudades-2026.json';
import { mxDia, mxProximo, colorDe, multaHnc, multaVerif, costoVerif, type MxParams, type VerifParams } from '../src/lib/engine/mx';
import { coDia, coMes, coProximo, type Ciudad } from '../src/lib/engine/co';
import { addDays, weekday, nthInMonth, todayIn } from '../src/lib/engine/dates';

const MX = P.mx as unknown as MxParams;
const V = P.mx.verif as unknown as VerifParams;
const C = (s: string) => (CO.ciudades as unknown as Ciudad[]).find((c) => c.slug === s)!;
const F: string[] = (P as unknown as { co: { festivos: string[] } }).co.festivos;

describe('dates', () => {
  it('jours de semaine et rang du samedi', () => {
    expect(weekday('2026-10-12')).toBe(1);
    expect(nthInMonth('2026-10-17')).toBe(3);
    expect(nthInMonth('2026-10-31')).toBe(5);
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
  it('jour civil dans le fuseau du pays', () => {
    expect(todayIn('America/Mexico_City', new Date('2026-10-13T04:30:00Z'))).toBe('2026-10-12');
    expect(todayIn('America/Bogota', new Date('2026-10-13T05:30:00Z'))).toBe('2026-10-13');
  });
});

describe('Hoy No Circula (decreto 2014, Tablas 1 y 2)', () => {
  it('engomados por día : lunes amarillo 5-6 … viernes azul 9-0', () => {
    expect(colorDe(MX, 5)).toBe('amarillo'); expect(colorDe(MX, 8)).toBe('rosa'); expect(colorDe(MX, 3)).toBe('rojo'); expect(colorDe(MX, 2)).toBe('verde'); expect(colorDe(MX, 0)).toBe('azul');
    expect(mxDia(MX, '2026-10-12', 5, '1').circula).toBe(false); // lunes 12 : amarillo (unotv, 12/10/2026)
    expect(mxDia(MX, '2026-10-12', 7, '1').circula).toBe(true);
    expect(mxDia(MX, '2026-10-13', 8, '2').circula).toBe(false);
    expect(mxDia(MX, '2026-10-16', 0, '1').circula).toBe(false);
  });
  it('00, 0, exento, motos y pase turístico exentos (decreto IV.1, IV.2 ; programa 2S2026 §14.1)', () => {
    for (const h of ['00', '0', 'exento', 'moto', 'pase'] as const) expect(mxDia(MX, '2026-10-12', 5, h).circula).toBe(true);
  });
  it('sábados del holograma 1 : nones 1.º y 3.º, pares 2.º y 4.º ; quinto sábado libre', () => {
    expect(mxDia(MX, '2026-10-03', 7, '1').circula).toBe(false); // 1.er sábado, non
    expect(mxDia(MX, '2026-10-03', 4, '1').circula).toBe(true);
    expect(mxDia(MX, '2026-10-10', 4, '1').circula).toBe(false); // 2.º sábado, par
    expect(mxDia(MX, '2026-10-17', 3, '1').circula).toBe(false); // 3.er sábado, non
    expect(mxDia(MX, '2026-10-24', 6, '1').circula).toBe(false); // 4.º sábado, par
    expect(mxDia(MX, '2026-10-31', 6, '1').motivo).toBe('quinto-sabado');
  });
  it('holograma 2 y foráneos : todos los sábados, quinto incluido', () => {
    expect(mxDia(MX, '2026-10-31', 1, '2').circula).toBe(false);
    expect(mxDia(MX, '2026-10-31', 1, 'foraneo').circula).toBe(false);
  });
  it('foráneo sin holograma : de lunes a viernes no circula de 5:00 a 11:00 (§14.2 IV)', () => {
    const r = mxDia(MX, '2026-10-13', 1, 'foraneo');
    expect(r.circula).toBe('depende'); expect(r.horas[0]).toEqual(['05:00', '11:00']);
  });
  it('domingo sin restricción', () => { expect(mxDia(MX, '2026-10-11', 5, '2').circula).toBe(true); });
  it('próximo día sin circular', () => {
    expect(mxProximo(MX, '2026-10-13', 5, '1', addDays)).toBe('2026-10-17'); // 3.er sábado, non
    expect(mxProximo(MX, '2026-10-13', 4, '0', addDays)).toBeNull();
  });
});

describe('Contingencia (PCAA 2019, Tabla 3 ; CAMe 12/09/2026)', () => {
  // Domingo 13/09/2026 : holograma 2 no ; holograma 1 nones no ; 0 y 00 engomado rosa no ; motos exentas en Fase I.
  const c = { activa: true, fase: 1 as const, holo1: 'non' as const, colorFinde: 'rosa' as const };
  it('caso real del 13 de septiembre de 2026', () => {
    expect(mxDia(MX, '2026-09-13', 2, '2', c).circula).toBe(false);
    expect(mxDia(MX, '2026-09-13', 3, '1', c).circula).toBe(false);
    expect(mxDia(MX, '2026-09-13', 4, '1', c).circula).toBe(true);
    expect(mxDia(MX, '2026-09-13', 7, '00', c).circula).toBe(false);
    expect(mxDia(MX, '2026-09-13', 9, '0', c).circula).toBe(true);
    expect(mxDia(MX, '2026-09-13', 3, 'moto', c).circula).toBe(true);
    expect(mxDia(MX, '2026-09-13', 3, 'exento', c).circula).toBe(true);
    expect(mxDia(MX, '2026-09-13', 3, 'pase', c).circula).toBe(false);
  });
  it('entre semana, 0 y 00 descansan el día de su engomado', () => {
    expect(mxDia(MX, '2026-10-14', 3, '0', { activa: true, fase: 1 }).circula).toBe(false);
    expect(mxDia(MX, '2026-10-14', 5, '0', { activa: true, fase: 1 }).circula).toBe(true);
  });
  it('sin el comunicado, el holograma 1 queda « depende »', () => {
    expect(mxDia(MX, '2026-10-14', 1, '1', { activa: true, fase: 1 }).circula).toBe('depende');
  });
  it('Fase II : la mitad de las motos', () => {
    expect(mxDia(MX, '2026-10-14', 2, 'moto', { activa: true, fase: 2, holo1: 'par' }).circula).toBe(false);
    expect(mxDia(MX, '2026-10-14', 3, 'moto', { activa: true, fase: 2, holo1: 'par' }).circula).toBe(true);
  });
});

describe('montos en UMA 2026 (INEGI : 117.31)', () => {
  it('multa Hoy No Circula 20, 25 y 30 UMA (Reglamento de Tránsito art. 47)', () => {
    expect(multaHnc(117.31, [20, 25, 30])).toEqual([2346.2, 2932.75, 3519.3]);
  });
  it('multa extemporánea 20 UMA y costo 5.625 UMA + IVA', () => {
    expect(multaVerif(V)).toBe(2346.2);
    expect(costoVerif(V)).toBe(765.45);
  });
});

describe('Pico y placa', () => {
  it('Bogotá : días pares restringen 1 a 5, impares 6 a 0 (bogota.gov.co, octubre 2026)', () => {
    expect(coDia(C('bogota'), '2026-10-13', 1, 'carro', F).estado).toBe('libre'); // martes 13 : circulan 1-5
    expect(coDia(C('bogota'), '2026-10-13', 6, 'carro', F).estado).toBe('restringido');
    expect(coDia(C('bogota'), '2026-10-26', 3, 'carro', F).estado).toBe('restringido'); // lunes 26 : circulan 6-0
    expect(coDia(C('bogota'), '2026-10-12', 3, 'carro', F).estado).toBe('festivo');
    expect(coDia(C('bogota'), '2026-10-03', 3, 'carro', F).estado).toBe('fin-de-semana');
  });
  it('Medellín : 5-8, 1-4, 0-2, 3-6, 7-9 desde el 3 de agosto (Decreto 1490 de 2026) ; motos por el primer número', () => {
    expect(coDia(C('medellin'), '2026-10-13', 4, 'carro', F).estado).toBe('restringido');
    expect(coDia(C('medellin'), '2026-10-14', 2, 'carro', F).estado).toBe('restringido');
    expect(coDia(C('medellin'), '2026-10-16', 9, 'moto', F).estado).toBe('restringido');
    expect(coDia(C('medellin'), '2026-07-30', 9, 'carro', F).estado).toBe('sin-datos');
    expect(C('medellin').motos?.digito).toBe('primero');
  });
  it('Cali : lunes 9-0 … viernes 7-8, motos exceptuadas', () => {
    expect(coDia(C('cali'), '2026-10-19', 0, 'carro', F).estado).toBe('restringido');
    expect(coDia(C('cali'), '2026-10-23', 8, 'carro', F).estado).toBe('restringido');
    expect(C('cali').motos).toBeNull();
  });
  it('Bucaramanga : rotación trimestral y sábados en ciclo (Resolución 854 de 2025)', () => {
    expect(coDia(C('bucaramanga'), '2026-09-28', 7, 'carro', F).estado).toBe('restringido'); // T3 lunes 7-8
    expect(coDia(C('bucaramanga'), '2026-10-05', 5, 'carro', F).estado).toBe('restringido'); // T4 lunes 5-6
    expect(coDia(C('bucaramanga'), '2026-10-10', 9, 'carro', F).restringidos).toEqual([9, 0]);
    expect(coDia(C('bucaramanga'), '2026-10-17', 1, 'carro', F).estado).toBe('restringido');
    expect(coDia(C('bucaramanga'), '2026-10-31', 6, 'carro', F).estado).toBe('restringido');
    expect(coDia(C('bucaramanga'), '2026-07-11', 4, 'carro', F).estado).toBe('restringido');
  });
  it('fuera de la vigencia publicada, el motor no inventa', () => {
    expect(coDia(C('cali'), '2027-01-04', 9, 'carro', F).estado).toBe('sin-datos');
    expect(coProximo(C('cali'), '2026-12-28', 1, 'carro', F)?.fecha).toBe('2026-12-29');
  });
  it('mes completo', () => {
    expect(coMes(C('bogota'), 2026, 10, 1, 'carro', F).filter((x) => x.estado === 'restringido').length).toBeGreaterThan(5);
  });
  it('cada ciudad tiene decreto, fuente y vigencia', () => {
    const src = (P as unknown as { sources: Record<string, unknown> }).sources;
    for (const c of CO.ciudades as unknown as Ciudad[]) {
      expect(c.decreto.length).toBeGreaterThan(10);
      expect(src[c.fuente], c.slug).toBeTruthy();
      expect(c.vigencia.desde < c.vigencia.hasta).toBe(true);
    }
  });
});
