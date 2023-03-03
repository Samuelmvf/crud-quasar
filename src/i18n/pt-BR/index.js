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

      }
    }
  },
  components: {
  }
}
