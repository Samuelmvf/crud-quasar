
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'cliente', component: () => import('pages/ListaCliente.vue') },
      { path: 'cliente/criar', component: () => import('pages/CadastroCliente.vue') },
      { path: 'cliente/:id', component: () => import('pages/CadastroCliente.vue') },
      { path: 'produto', component: () => import('pages/ListaProduto.vue') },
      { path: 'produto/criar', component: () => import('pages/CadastroProduto.vue') },
      { path: 'produto/:id', component: () => import('pages/CadastroProduto.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
