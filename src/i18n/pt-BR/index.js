export default {
  layouts: {
    main: {
      menu: {
        cliente: {
          titulo: 'Gestão de clientes',
          acoes: {
            criar: 'Criar cliente',
            listar: 'Listar clientes'
          }
        },
        produto: {
          titulo: 'Gestão de produtos',
          acoes: {
            criar: 'Criar produto',
            listar: 'Listar produtos'
          }
        }
      }
    }
  },
  pages: {
    cliente: {
      cadastro: {
        titulo: {
          cadastrar: 'CADASTRO DE CLIENTE',
          editar: 'EDITAR CLIENTE'
        },
        form: {
          input: {
            ativo: {
              label: 'Ativo',
            },
            documento: {
              label: 'Documento*',
              rules: 'Preencha o documento corretamente'
            },
            email: {
              label: 'Email*',
              rules: 'Preencha o campo email corretamente'
            },
            nome: {
              label: 'Nome*',
              rules: 'Preencha o nome corretamente'
            },
            telefone: {
              label: 'Telefone*',
              rules: 'Preencha o telefone corretamente'
            }
          }
        },
        button: {
          editar: {
            label: 'Editar'
          },
          cadastrar: {
            label: 'Cadastrar'
          },
          cancelar: {
            label: 'Cancelar'
          }
        },
        acao: {
          atualizar: {
            notificacao: {
              sucesso: 'Cliente atualizado com sucesso.',
              erro: 'Falha ao atualizar cliente. Tente novamente mais tarde.'
            }
          },
          cadastrar: {
            notificacao: {
              sucesso: 'Cliente cadastrado com sucesso.',
              erro: 'Falha ao cadastrar cliente. Tente novamente mais tarde.'
            }
          },
          buscarCliente: {
            notificacao: {
              erro: 'Falha ao buscar cliente. Tente novamente mais tarde.'
            }
          }
        }
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
        titulo: {
          cadastrar: 'CADASTRO DE PRODUTO',
          editar: 'EDITAR PRODUTO'
        },
        form: {
          input: {
            ativo: {
              label: 'Ativo',
            },
            nome: {
              label: 'Nome*',
              rules: 'Preencha o nome corretamente'
            }
          }
        },
        button: {
          editar: {
            label: 'Editar'
          },
          cadastrar: {
            label: 'Cadastrar'
          },
          cancelar: {
            label: 'Cancelar'
          }
        },
        acao: {
          atualizar: {
            notificacao: {
              sucesso: 'Produto atualizado com sucesso.',
              erro: 'Falha ao atualizar produto. Tente novamente mais tarde.'
            }
          },
          cadastrar: {
            notificacao: {
              sucesso: 'Produto cadastrado com sucesso.',
              erro: 'Falha ao cadastrar produto. Tente novamente mais tarde.'
            }
          },
          buscarProduto: {
            notificacao: {
              erro: 'Falha ao buscar produto. Tente novamente mais tarde.'
            }
          }
        }
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
