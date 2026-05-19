const PARTICLE_COUNT = 22;

const characters = [
  {
    name: 'KAEL',
    role: 'Guerreiro',
    element: 'pyro',
    elementLabel: 'Pyro',
    badge: 'PY',
    image: 'assets/pyro.png',
    description: 'Lâmina forjada na chama dos mundos caídos. Sua raiva queima mais que qualquer fogo.',
    accent: '#ff6b35',
    glow: 'rgba(255,107,53,0.4)',
    background: 'linear-gradient(160deg, #1a0810 0%, #3d0f0f 40%, #1a0508 100%)',
    stats: {
      atk: 90,
      def: 48,
      spd: 70,
    },
  },
  {
    name: 'LYRA',
    role: 'Maga',
    element: 'cryo',
    elementLabel: 'Cryo',
    badge: 'CR',
    image: 'assets/crio.png',
    description: 'A voz do inverno eterno. Cada feitiço que lança congela o tempo ao redor.',
    accent: '#5bc4e8',
    glow: 'rgba(91,196,232,0.4)',
    background: 'linear-gradient(160deg, #060d1e 0%, #0a2040 40%, #061218 100%)',
    stats: {
      atk: 72,
      def: 55,
      spd: 82,
    },
  },
  {
    name: 'ZHEN',
    role: 'Invocador',
    element: 'aether',
    elementLabel: 'Aether',
    badge: 'AE',
    image: 'assets/aether.png',
    description: 'Dobra a realidade com a ponta dos dedos. O espaço entre mundos obedece sua vontade.',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.4)',
    background: 'linear-gradient(160deg, #0a0a18 0%, #1a0a35 40%, #0a0a1a 100%)',
    stats: {
      atk: 80,
      def: 62,
      spd: 78,
    },
  },
  {
    name: 'NYX',
    role: 'Assassino',
    element: 'void',
    elementLabel: 'Void',
    badge: 'VO',
    image: 'assets/void.png',
    description: 'Emerge das sombras sem rastro. Seus golpes apagam memórias e deixam apenas silêncio.',
    accent: '#22d3a8',
    glow: 'rgba(34,211,168,0.4)',
    background: 'linear-gradient(160deg, #050508 0%, #0f0818 40%, #050508 100%)',
    stats: {
      atk: 85,
      def: 40,
      spd: 95,
    },
  },
];

const worldFeatures = [
  {
    index: '01',
    title: 'Biomas vivos',
    description: 'Tempestades, ruínas e criaturas alteram rotas conforme o Rift se expande.',
  },
  {
    index: '02',
    title: 'Facções em conflito',
    description: 'Suas alianças mudam missões, preços, patrulhas e encontros pelo mapa.',
  },
  {
    index: '03',
    title: 'Segredos verticais',
    description: 'Escalada, portais e correntes etéreas revelam camadas escondidas do mundo.',
  },
];
