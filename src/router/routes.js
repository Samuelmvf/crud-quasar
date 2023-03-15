
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'cliente', component: () => import('pages/cliente/ListaCliente.vue') },
      { path: 'cliente/criar', component: () => import('pages/cliente/CadastroCliente.vue') },
      { path: 'cliente/:id', component: () => import('pages/cliente/CadastroCliente.vue') },
      { path: 'produto', component: () => import('pages/produto/ListaProduto.vue') },
      { path: 'produto/criar', component: () => import('pages/produto/CadastroProduto.vue') },
      { path: 'produto/:id', component: () => import('pages/produto/CadastroProduto.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
