export default {
  layouts: {
    main: {
      menu: {
        cliente: {
          titulo: 'Client management',
          acoes: {
            criar: 'New client',
            listar: 'Client list'
          }
        },
        produto: {
          titulo: 'Product management',
          acoes: {
            criar: 'New product',
            listar: 'Product list'
          }
        }
      }
    }
  },
  pages: {
    cliente: {
      cadastro: {
        titulo: {
          cadastrar: 'NEW CUSTOMER',
          editar: 'EDIT CUSTOMER'
        },
        form: {
          input: {
            ativo: {
              label: 'Active',
            },
            documento: {
              label: 'Document*',
              rules: 'Fill in the document correctly'
            },
            email: {
              label: 'Email*',
              rules: 'Fill in the email correctly'
            },
            nome: {
              label: 'Name*',
              rules: 'Fill in the name correctly'
            },
            telefone: {
              label: 'Phone*',
              rules: 'Fill in the phone correctly'
            }
          }
        },
        button: {
          editar: {
            label: 'Edit'
          },
          cadastrar: {
            label: 'Register'
          },
          cancelar: {
            label: 'Cancel'
          }
        },
        acao: {
          atualizar: {
            notificacao: {
              sucesso: 'Customer updated successfully',
              erro: 'Failed to update customer. Try again later'
            }
          },
          cadastrar: {
            notificacao: {
              sucesso: 'Customer created successfully.',
              erro: 'Failed to create customer. Try again later.'
            }
          },
          buscarCliente: {
            notificacao: {
              erro: 'Failed to fetch client. Try again later.'
            }
          }
        }
      },
      lista: {
        titulo: 'CUSTOMER',
        button: {
          fechar: {
            label: 'Close'
          },
          editar: {
            tooltip: 'Edit customer'
          },
          gerenciarProduto: {
            tooltip: 'Manage associated products'
          },
          deletar: {
            tooltip: 'Delete'
          }
        },
        semDados: 'No registered customer',
        acao: {
          deletar: {
            modal: {
              confirmacao: {
                descricao: 'Do you really want to delete the customer "{nome}" ?',
                labelConfirmarAcao: 'Delete',
                labelCancelarAcao: 'Cancel',
              }
            },
            notificacao: {
              sucesso: 'Customer deleted successfully.',
              erro: 'Failed to delete customer. Try again later.'
            }
          },
          buscar: {
            notificacao: {
              erro: 'Failed to load customers. Try again later.'
            }
          }
        }
      }
    },
    produto: {
      cadastro: {
        titulo: {
          cadastrar: 'PRODUCT REGISTRATION',
          editar: 'EDIT PRODUCT'
        },
        form: {
          input: {
            ativo: {
              label: 'Active',
            },
            nome: {
              label: 'Name*',
              rules: 'Fill in the name correctly'
            }
          }
        },
        button: {
          editar: {
            label: 'Edit'
          },
          cadastrar: {
            label: 'Register'
          },
          cancelar: {
            label: 'Cancel'
          }
        },
        acao: {
          atualizar: {
            notificacao: {
              sucesso: 'Product updated successfully.',
              erro: 'Failed to update product. Try again later.'
            }
          },
          cadastrar: {
            notificacao: {
              sucesso: 'Product created successfully.',
              erro: 'Failed to create product. Try again later.'
            }
          },
          buscarProduto: {
            notificacao: {
              erro: 'Failed to fetch product. Try again later.'
            }
          }
        }
      },
      lista: {
        titulo: 'PRODUCT',
        button: {
          fechar: {
            label: 'Close'
          },
          editar: {
            tooltip: 'Edit product'
          },
          deletar: {
            tooltip: 'Delete'
          }
        },
        semDados: 'No registered product',
        acao: {
          deletar: {
            modal: {
              confirmacao: {
                descricao: 'Do you really want to delete the product "{nome}" ?',
                labelConfirmarAcao: 'Delete',
                labelCancelarAcao: 'Cancel',
              }
            },
            notificacao: {
              sucesso: 'Product deleted successfully.',
              erro: 'Failed to delete product. Try again later.'
            }
          },
          buscar: {
            notificacao: {
              erro: 'Failed to load products. Try again later.'
            }
          }
        }
      }
    }
  },
  components: {
    modal: {
      associacaoProdutoCliente: {
        titulo: 'Product management'.toUpperCase(),
        form: {
          input: {
            associarProduto: {
              label: 'Avaliable products'
            }
          },
          semDados: 'No product available'
        },
        button: {
          vincular: 'Associate',
          fechar: 'Close'
        },
        tituloProdutosAssociados: 'Associated products',
        semDadosAssociados: 'No associated product',
        acoes: {
          buscarProdutos: {
            erro: 'Failed to load products. Try again later.'
          },
          salvarCliente: {
            sucesso: 'Product(s) successfully associated with the customer.',
            erro: 'Failed to associate product(s) with the customer. Try again later.'
          }
        }
      }
    }
  }
}
