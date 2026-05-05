// ─── Image URLs (remote only — not committed to repo) ───────────────────────
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1760163630058-aa71c91783bf?auto=format&fit=crop&w=1400&q=80',
  latte: 'https://images.unsplash.com/photo-1760163630058-aa71c91783bf?auto=format&fit=crop&w=600&q=80',
  coldBrew: 'https://images.unsplash.com/photo-1759754147072-aff1923ba10f?auto=format&fit=crop&w=600&q=80',
  twoCoffees: 'https://images.unsplash.com/photo-1680882124594-0be7eb308822?auto=format&fit=crop&w=600&q=80',
  avoToast: 'https://images.unsplash.com/photo-1761027101409-fa96d88349c7?auto=format&fit=crop&w=600&q=80',
  dessert: 'https://images.unsplash.com/photo-1756550302859-e7d080ea9612?auto=format&fit=crop&w=600&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1671637293093-da7a10d3239a?auto=format&fit=crop&w=600&q=80',
  lemonade: 'https://images.unsplash.com/photo-1696957024709-0e3e7df73aaf?auto=format&fit=crop&w=600&q=80',
  lemonadeClose: 'https://images.unsplash.com/photo-1754317893261-9a0121d6954b?auto=format&fit=crop&w=600&q=80',
}

// ─── Types ───────────────────────────────────────────────────────────────────
export type Badge = 'Recomendado' | 'Nuevo' | 'Especial'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: Badge
}

export interface Category {
  id: string
  label: string
  icon: string
  items: MenuItem[]
}

// ─── Menu Data ───────────────────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: 'cafe',
    label: 'Café',
    icon: 'coffee',
    items: [
      { id: 'c1', name: 'Latte', description: 'Suave, cremoso y balanceado.', price: 48, image: IMAGES.latte },
      { id: 'c2', name: 'Cold Brew', description: 'Notas dulces, cuerpo suave y final limpio.', price: 52, image: IMAGES.coldBrew },
      { id: 'c3', name: 'Capuchino', description: 'Clásico, espumoso y reconfortante.', price: 46, image: IMAGES.twoCoffees },
      { id: 'c4', name: 'Espresso Doble', description: 'Intenso, directo y sin rodeos.', price: 42, image: IMAGES.latte },
    ],
  },
  {
    id: 'desayunos',
    label: 'Desayunos',
    icon: 'sun',
    items: [
      { id: 'd1', name: 'Avo Toast', description: 'Aguacate, tomate cherry, huevo pochado y arúgula.', price: 89, image: IMAGES.avoToast, badge: 'Recomendado' },
      { id: 'd2', name: 'Pan Francés', description: 'Frutos rojos, miel de maple y crema ligera.', price: 85, image: IMAGES.dessert },
      { id: 'd3', name: 'Croissant de Jamón', description: 'Mantequilla, queso fundido y jamón de pavo.', price: 76, image: IMAGES.dessert },
    ],
  },
  {
    id: 'platos',
    label: 'Platos',
    icon: 'utensils',
    items: [
      { id: 'p1', name: 'Bowl Discco', description: 'Arroz, vegetales asados, huevo y aderezo de la casa.', price: 112, image: IMAGES.avoToast, badge: 'Especial' },
      { id: 'p2', name: 'Sandwich de Pollo', description: 'Pollo especiado, pan artesanal y ensalada fresca.', price: 98, image: IMAGES.avoToast },
      { id: 'p3', name: 'Pasta Corta', description: 'Salsa cremosa, parmesano y hierbas.', price: 118, image: IMAGES.dessert },
    ],
  },
  {
    id: 'postres',
    label: 'Postres',
    icon: 'cake',
    items: [
      { id: 'ps1', name: 'Brownie Amplificado', description: 'Chocolate intenso, nuez y sal de mar.', price: 58, image: IMAGES.cheesecake },
      { id: 'ps2', name: 'Cheesecake de Temporada', description: 'Cremoso, fresco y con fruta de estación.', price: 72, image: IMAGES.cheesecake },
      { id: 'ps3', name: 'Galleta de Avena', description: 'Crujiente por fuera, suave por dentro.', price: 38, image: IMAGES.dessert },
    ],
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    icon: 'cup',
    items: [
      { id: 'b1', name: 'Limonada Natural', description: 'Limón real, menta fresca y hielo.', price: 42, image: IMAGES.lemonade },
      { id: 'b2', name: 'Matcha Latte', description: 'Suave, herbal y ligeramente dulce.', price: 62, image: IMAGES.lemonadeClose },
      { id: 'b3', name: 'Agua Mineral Preparada', description: 'Cítricos, sal y burbuja fría.', price: 39, image: IMAGES.lemonade },
    ],
  },
]

export const featuredItem = {
  name: 'Bowl Discco + Cold Brew',
  description: 'El almuerzo perfecto. Un bowl completo con nuestro Cold Brew signature.',
  price: 149,
}
