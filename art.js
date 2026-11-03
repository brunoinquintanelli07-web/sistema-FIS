/* Ilustraciones simples, hechas con formas geométricas, una por categoría.
   Paleta: celeste, naranja y rosado. Son decorativas (aria-hidden). */
const C1 = '#DDF1FA', C3 = '#8FD0EC', C7 = '#17668C';
const N3 = '#F6B36B', N5 = '#F28C28';
const R1 = '#FDE3EC', R3 = '#F4A7C0', R7 = '#9C1F4B';
const INK = '#12304A';

const svg = (inner) =>
  `<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;

const petal = (deg, fill) =>
  `<ellipse cx="200" cy="129" rx="16" ry="46" fill="${fill}" transform="rotate(${deg} 200 175)"/>`;

export const ART = {
  Teatro: svg(`
    <rect width="400" height="240" fill="${R1}"/>
    <polygon points="200,0 115,195 285,195" fill="#fff" opacity=".75"/>
    <rect y="190" width="400" height="50" fill="${N5}"/>
    <ellipse cx="200" cy="192" rx="84" ry="11" fill="${N3}"/>
    <path d="M0 0H122C106 70 96 140 60 240H0Z" fill="${R3}"/>
    <path d="M0 0H70C60 80 50 160 30 240H0Z" fill="${R7}" opacity=".22"/>
    <path d="M400 0H278C294 70 304 140 340 240H400Z" fill="${R3}"/>
    <path d="M400 0H330C340 80 350 160 370 240H400Z" fill="${R7}" opacity=".22"/>
    <rect width="400" height="24" fill="${R7}"/>`),

  Cine: svg(`
    <rect width="400" height="240" fill="${C3}"/>
    <circle cx="150" cy="120" r="74" fill="${N5}"/>
    <circle cx="150" cy="120" r="14" fill="${INK}"/>
    <g fill="${C1}">
      <circle cx="190" cy="120" r="14"/><circle cx="170" cy="154.600" r="14"/><circle cx="130" cy="154.600" r="14"/>
      <circle cx="110" cy="120" r="14"/><circle cx="130" cy="85.400" r="14"/><circle cx="170" cy="85.400" r="14"/>
    </g>
    <g transform="rotate(-12 300 120)">
      <rect x="252" y="10" width="92" height="220" rx="6" fill="${INK}"/>
      <g fill="${C3}">
        ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="258" y="${24 + i * 29}" width="10" height="14" rx="2"/><rect x="328" y="${24 + i * 29}" width="10" height="14" rx="2"/>`).join('')}
      </g>
      <rect x="274" y="22" width="48" height="60" fill="${C1}"/>
      <rect x="274" y="92" width="48" height="60" fill="${R3}"/>
      <rect x="274" y="162" width="48" height="56" fill="${N3}"/>
    </g>`),

  'Gastronomía': svg(`
    <rect width="400" height="240" fill="${N3}"/>
    <circle cx="200" cy="124" r="88" fill="#fff"/>
    <circle cx="200" cy="124" r="62" fill="${C1}"/>
    <circle cx="184" cy="116" r="18" fill="${N5}"/>
    <circle cx="218" cy="106" r="13" fill="${R3}"/>
    <circle cx="208" cy="144" r="11" fill="${C3}"/>
    <g fill="#fff">
      <rect x="62" y="36" width="6" height="50" rx="3"/><rect x="73" y="36" width="6" height="50" rx="3"/><rect x="84" y="36" width="6" height="50" rx="3"/>
      <rect x="62" y="76" width="28" height="16" rx="8"/>
      <rect x="70" y="86" width="12" height="120" rx="6"/>
      <path d="M326 36C348 58 348 112 326 138H318V36Z"/>
      <rect x="318" y="130" width="10" height="76" rx="5"/>
    </g>`),

  Talleres: svg(`
    <rect width="400" height="240" fill="${C1}"/>
    <path d="M116 62C186 22 300 42 322 112C338 172 272 202 232 178C206 162 200 192 160 198C100 204 58 142 80 102C88 82 100 70 116 62Z" fill="${N3}"/>
    <circle cx="214" cy="152" r="16" fill="${C1}"/>
    <circle cx="128" cy="104" r="17" fill="${N5}"/>
    <circle cx="174" cy="78" r="17" fill="${R3}"/>
    <circle cx="238" cy="86" r="17" fill="${C3}"/>
    <circle cx="282" cy="124" r="15" fill="#fff"/>
    <g transform="rotate(38 330 150)">
      <rect x="322" y="62" width="16" height="150" rx="8" fill="${R7}"/>
      <rect x="322" y="62" width="16" height="28" fill="${C3}"/>
      <path d="M322 62Q330 18 338 62Z" fill="${N5}"/>
    </g>`),

  Yoga: svg(`
    <rect width="400" height="240" fill="${R1}"/>
    <circle cx="200" cy="170" r="104" fill="${N3}"/>
    <circle cx="200" cy="170" r="72" fill="${N5}" opacity=".85"/>
    <rect y="172" width="400" height="68" fill="${C3}"/>
    ${petal(-62, C1)}${petal(62, C1)}${petal(-31, '#fff')}${petal(31, '#fff')}${petal(0, R3)}
    <ellipse cx="200" cy="198" rx="74" ry="8" fill="none" stroke="#fff" stroke-width="3"/>
    <ellipse cx="200" cy="216" rx="118" ry="11" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`),

  Pilates: svg(`
    <rect width="400" height="240" fill="${C1}"/>
    <circle cx="214" cy="112" r="78" fill="${R3}"/>
    <path d="M160 86A62 62 0 0 1 220 48" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/>
    <path d="M138 114H290" stroke="${R7}" stroke-width="4" opacity=".25"/>
    <circle cx="86" cy="120" r="38" fill="none" stroke="${N5}" stroke-width="13"/>
    <rect x="36" y="188" width="328" height="26" rx="13" fill="${C7}"/>
    <circle cx="352" cy="201" r="13" fill="${C3}"/>`),

  Baile: svg(`
    <rect width="400" height="240" fill="${C3}"/>
    <circle cx="200" cy="124" r="100" fill="${INK}"/>
    <g fill="none" stroke="#fff" opacity=".18" stroke-width="2"><circle cx="200" cy="124" r="86"/><circle cx="200" cy="124" r="72"/><circle cx="200" cy="124" r="58"/></g>
    <circle cx="200" cy="124" r="34" fill="${N5}"/>
    <circle cx="200" cy="124" r="6" fill="${INK}"/>
    <g fill="#fff">
      <ellipse cx="62" cy="186" rx="15" ry="10.500" transform="rotate(-20 62 186)"/>
      <rect x="73" y="100" width="5" height="82"/>
      <path d="M78 100C96 106 104 122 98 140C94 126 88 118 78 114Z"/>
      <ellipse cx="318" cy="190" rx="14" ry="10" transform="rotate(-20 318 190)"/>
      <ellipse cx="358" cy="178" rx="14" ry="10" transform="rotate(-20 358 178)"/>
      <rect x="328" y="106" width="5" height="82"/><rect x="368" y="94" width="5" height="82"/>
      <polygon points="328,106 373,94 373,104 328,116"/>
    </g>`)
};

export const arte = (categoria) => ART[categoria] || ART.Talleres;
