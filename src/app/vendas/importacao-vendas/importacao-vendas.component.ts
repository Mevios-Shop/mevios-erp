import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plataforma } from 'src/app/plataformas/plataforma.model';
import { PlataformaService } from 'src/app/plataformas/plataforma.service';
import { EstoqueService } from 'src/app/produtos/estoque/estoque.service';
import { VariacaoProdutoService } from 'src/app/produtos/variacao-produto/variacao-produto.service';
import { read, utils } from 'xlsx';
import { StatusVenda } from '../status-venda/status-venda.model';
import { StatusVendaService } from '../status-venda/status-venda.service';
import { Venda } from '../venda/venda.model';
import { VendaService } from '../venda/venda.service';
import { ImportarVendaInterface } from './interface/importar-venda.interface';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { ItemVendaInterface } from './interface/item-venda.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-importacao-vendas',
  templateUrl: './importacao-vendas.component.html',
  styleUrls: ['./importacao-vendas.component.css']
})
export class ImportacaoVendasComponent implements OnInit {

  colunasConhecidas: string[] = []
  colunasConhecidasObrigatorias: string[] = []

  origemDoArquivo: string = ''

  nomeDoArquivo = 'Selecione o arquivo';
  linhasDoArquivoExcel: any[] = [];
  columnsTitles: Array<String> = []
  columnsValues: Array<any> = []

  plataforma?: Plataforma

  vendas: ImportarVendaInterface[] = []

  listaStatusVenda: StatusVenda[] = []

  colunasObrigatoriasNaoPreenchidas: string[] = []


  //dadosDasVendasCompleto: DadosVendaDto[] = []


  form = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileLabel: new FormControl('')
  });

  constructor(
    private readonly plataformaService: PlataformaService,
    private readonly vendaService: VendaService,
    private readonly statusVendaService: StatusVendaService,
    private readonly variacaoProdutoService: VariacaoProdutoService,
    private readonly estoqueService: EstoqueService
  ) { }

  ngOnInit(): void {
    this.statusVendaService.buscarTodos()
      .subscribe((statusVenda: StatusVenda[]) => {
        this.listaStatusVenda = statusVenda
      })
  }

  importar() {

    if (this.vendas.length > 0) {
      this.vendaService.importarVendas(this.vendas)
        .subscribe((resultado: any) => {

          if (resultado.message && resultado.message === 'Vendas importadas com sucesso') {
            alert('Vendas importadas com sucesso!')
          } else {
            if (resultado.message && resultado.message != 'Vendas importadas com sucesso') {
              alert(resultado.message)
            } else {
              alert('Erro ao importar vendas!')
            }
          }
        })

    } else {
      alert('Os dados das vendas não foram carregados corretamente')
    }
  }

  converterDadosEmVendas() {
    const usuario = Security.getUser()

    this.linhasDoArquivoExcel.forEach((linha: any) => {

      if (this.vendas.find(venda => venda.codigo_pedido === linha['ID do pedido'])) {

        this.vendas.find(venda => venda.codigo_pedido === linha['ID do pedido'])?.itensVenda.push({
          variacao_produto: linha['Número de referência SKU'],
          valor: linha['Preço acordado'],
          quantidade: linha['Quantidade'],
          usuario: usuario.id
        })
      } else {
        const itemVendaDto: ItemVendaInterface = {
          variacao_produto: linha['Número de referência SKU'],
          valor: linha['Preço acordado'],
          quantidade: linha['Quantidade'],
          usuario: usuario.id
        }

        const vendaCompleta: ImportarVendaInterface = {
          codigo_pedido: linha['ID do pedido'],
          codigo_rastreamento: linha['Número de rastreamento'],
          comissao: linha['Taxa de comissão'],
          data: this.formatarData(linha['Hora do pagamento do pedido']),
          itensVenda: [itemVendaDto],
          plataforma: 1,
          status_venda: linha['Status do pedido'],
          transportadora: linha['Opção de envio'],
          usuario: usuario.id,
        }

        this.vendas.push(vendaCompleta)

      }
    })
  }

  extrairDadosNecessariosDaPlanilha(linhasDoArquivoExcel: any[]) {

    this.verificarOrigemDoArquivo(linhasDoArquivoExcel)

    if (this.origemDoArquivo) {
      linhasDoArquivoExcel.forEach((linha: any) => {

        if (linha['Status do pedido'] != 'Cancelado' || linha['Status do pedido'] == 'Cancelado' && linha['Número de rastreamento']) {

          if (linha['Status do pedido'] == 'Cancelado') {
            linha['Status do pedido'] = 'Cancelado após a confirmação do pagamento'
          }

          const keys = Object.keys(linha).filter(coluna => this.colunasConhecidas.includes(coluna))
          const values = Object.values(linha).filter((valor: any, index: number) => keys.includes(Object.keys(linha)[index]))

          let objeto: any = {}

          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const value = values[index];

            const novaLinha = {
              [key]: value
            }
            objeto = { ...objeto, ...novaLinha }
          }
          this.columnsValues.push(values)

          this.linhasDoArquivoExcel.push(objeto)
        }
        
      })

      const dadosObrigatoriosPreenchidos = this.verificarSeAsColunasObrigatoriasEstaoPreenchidas()

      if (dadosObrigatoriosPreenchidos) {
        this.converterDadosEmVendas()
      }
    }



  }


  carregarPlanilha(event: any) {

    const arquivoCarregado = event.target.files[0];

    if (!arquivoCarregado) {
      alert('O arquivo não foi selecionado corretamente!')
      this.resetarFormulario()
    } else {
      if (!this.verificarSeArquivoDoTipoXLSX(arquivoCarregado)) {
        alert('O arquivo deve ser do tipo XLSX')
        this.resetarFormulario()
      }
    }

    this.nomeDoArquivo = arquivoCarregado.name

    const reader = new FileReader();

    reader.onload = (event: any) => {
      const wb = read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        this.extrairDadosNecessariosDaPlanilha(utils.sheet_to_json(wb.Sheets[sheets[0]]))


      }
    }
    reader.readAsArrayBuffer(arquivoCarregado);



  }

  resetarFormulario() {
    this.form.reset()
    this.nomeDoArquivo = 'Selecione o arquivo'
    this.linhasDoArquivoExcel = []
    this.columnsTitles = []
    this.columnsValues = []
  }

  verificarOrigemDoArquivo(linhasDoArquivoExcel: any[]) {

    const colunasShopee = [
      { coluna: 'ID do pedido', obrigatoria: true },
      { coluna: 'Número de rastreamento', obrigatoria: false },
      { coluna: 'Taxa de comissão', obrigatoria: true },
      { coluna: 'Hora do pagamento do pedido', obrigatoria: true },
      { coluna: 'Número de referência SKU', obrigatoria: true },
      { coluna: 'Preço acordado', obrigatoria: true },
      { coluna: 'Quantidade', obrigatoria: true },
      { coluna: 'Status do pedido', obrigatoria: true },
      { coluna: 'Opção de envio', obrigatoria: true }
    ]

    const colunasDoArquivoExcel = Object.keys(linhasDoArquivoExcel[0])

    //condição IF par verificar se colunasShopee obrigatorias estão no arquivo excel
    if (
      colunasShopee.filter(coluna => coluna.obrigatoria)
        .map(coluna => coluna.coluna)
        .every(coluna => colunasDoArquivoExcel
          .includes(coluna))
    ) {
      this.origemDoArquivo = 'shopee'
      this.colunasConhecidas = colunasShopee.map(coluna => coluna.coluna)

      this.colunasConhecidasObrigatorias = colunasShopee.filter(coluna => coluna.obrigatoria).map(coluna => coluna.coluna)
    } else {
      this.origemDoArquivo = ''
    }

    if (this.origemDoArquivo === '') {
      alert('Não foi possível identificar a origem do arquivo')
      this.resetarFormulario()
    }
  }

  verificarSeAsColunasObrigatoriasEstaoPreenchidas(): boolean {

    const linhasDoArquivoExcel = this.linhasDoArquivoExcel

    this.colunasObrigatoriasNaoPreenchidas = this.colunasConhecidasObrigatorias.filter(coluna => {
      return linhasDoArquivoExcel.filter(linha => {
        return linha[coluna] === undefined || linha[coluna] === ''
      }).length > 0
    })

    if (this.colunasObrigatoriasNaoPreenchidas.length) {
      alert('As colunas obrigatórias não foram preenchidas corretamente')
      this.resetarFormulario()
      return false
    } else {
      return true
    }
  }

  verificarSeArquivoDoTipoXLSX(file: any): boolean {
    const lista: Array<any> = file.name.split('.')
    if (lista[lista.length - 1] === 'xlsx') {
      return true
    } else {
      return false
    }
  }

  //formatar data para o formato do banco de dados
  formatarData(data: string) {
    let dataFormatada = new Date(data)
    return dataFormatada
  }

}
