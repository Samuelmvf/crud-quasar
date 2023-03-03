export default {
  pages: {
    cliente: {
      cadastro: {
      },
      lista: {
        titulo: 'CLIENTE',
        button: {
          fechar: {
            label: 'Fechar'
          },
          editar: {
            tooltip: 'Editar cliente'
          },
          gerenciarProduto: {
            tooltip: 'Gerenciar produtos associados'
          },
          deletar: {
            tooltip: 'Deletar'
          }
        },
        semDados: 'Nenhum cliente cadastrado',
        acao: {
          deletar: {
            modal: {
              confirmacao: {
                descricao: 'Deseja realmente deletar o(a) cliente "{nome}" ?',
                labelConfirmarAcao: 'Deletar',
                labelCancelarAcao: 'Cancelar',
              }
            },
            notificacao: {
              sucesso: 'Cliente deletado com sucesso.',
              erro: 'Falha ao deletar cliente. Tente novamente mais tarde.'
            }
          },
          buscar: {
            notificacao: {
              erro: 'Falha ao carregar clientes. Tente novamente mais tarde.'
            }
          }
        }
      }
    },
    produto: {
      cadastro: {
      },
      lista: {
        titulo: 'PRODUTO',
        button: {
          fechar: {
            label: 'Fechar'
          },
          editar: {
            tooltip: 'Editar produto'
          },
          deletar: {
            tooltip: 'Deletar'
          }
        },
        semDados: 'Nenhum produto cadastrado',
        acao: {
          deletar: {
            modal: {
              confirmacao: {
                descricao: 'Deseja realmente deletar o produto "{nome}" ?',
                labelConfirmarAcao: 'Deletar',
                labelCancelarAcao: 'Cancelar',
              }
            },
            notificacao: {
              sucesso: 'Produto deletado com sucesso.',
              erro: 'Falha ao deletar produto. Tente novamente mais tarde.'
            }
          },
          buscar: {
            notificacao: {
              erro: 'Falha ao carregar produtos. Tente novamente mais tarde.'
            }
          }
        }
      }
    }
  },
  components: {
  }
}
