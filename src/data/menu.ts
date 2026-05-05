export type Badge = 'Recomendado' | 'Nuevo' | 'Especial'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  badge?: Badge
}

export interface Category {
  id: string
  name: string
  icon?: string
  items: MenuItem[]
}

export const menuData: Category[] = [
  {
    id: 'cafe',
    name: 'Café',
    items: [
      { id: 'c1', name: 'Latte', description: 'Suave, cremoso y balanceado.', price: 48 },
      { id: 'c2', name: 'Cold Brew', description: 'Notas dulces, cuerpo suave y final limpio.', price: 52 },
      { id: 'c3', name: 'Capuchino', description: 'Clásico, espumoso y reconfortante.', price: 46 },
      { id: 'c4', name: 'Espresso Doble', description: 'Intenso, directo y sin rodeos.', price: 42 },
    ],
  },
  {
    id: 'desayunos',
    name: 'Desayunos',
    items: [
      { id: 'd1', name: 'Avo Toast', description: 'Aguacate, tomate cherry, huevo pochado y arúgula.', price: 89, badge: 'Recomendado' },
      { id: 'd2', name: 'Pan Francés', description: 'Frutos rojos, miel de maple y crema ligera.', price: 85 },
      { id: 'd3', name: 'Croissant de Jamón', description: 'Mantequilla, queso fundido y jamón de pavo.', price: 76 },
    ],
  },
  {
    id: 'platos',
    name: 'Platos',
    items: [
      { id: 'p1', name: 'Bowl Discco', description: 'Arroz, vegetales asados, huevo y aderezo de la casa.', price: 112, badge: 'Especial' },
      { id: 'p2', name: 'Sandwich de Pollo', description: 'Pollo especiado, pan artesanal y ensalada fresca.', price: 98 },
      { id: 'p3', name: 'Pasta Corta', description: 'Salsa cremosa, parmesano y hierbas.', price: 118 },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    items: [
      { id: 'ps1', name: 'Brownie Amplificado', description: 'Chocolate intenso, nuez y sal de mar.', price: 58 },
      { id: 'ps2', name: 'Cheesecake de Temporada', description: 'Cremoso, fresco y con fruta de estación.', price: 72 },
      { id: 'ps3', name: 'Galleta de Avena', description: 'Crujiente por fuera, suave por dentro.', price: 38 },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    items: [
      { id: 'b1', name: 'Limonada Natural', description: 'Limón real, menta fresca y hielo.', price: 42 },
      { id: 'b2', name: 'Matcha Latte', description: 'Suave, herbal y ligeramente dulce.', price: 62 },
      { id: 'b3', name: 'Agua Mineral Preparada', description: 'Cítricos, sal y burbuja fría.', price: 39 },
    ],
  },
]

export const featuredItem = {
  title: 'Combo Especial',
  name: 'Bowl Discco + Cold Brew',
  description: 'El almoço perfecto. Un bowl completo con nuestro Cold Brew signature.',
  price: 149,
  badge: 'Especial de la casa' as Badge,
}
