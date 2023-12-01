import React, { ChangeEvent, KeyboardEvent } from 'react'
import './App.css'

import Calculos from './componentes/Calculos'

type Props = {

}

export default class Main extends React.Component{
  listaNumeros: object[]
  x: object[]
  y: object[]

  state: {
    render: JSX.Element[],
    renderX: JSX.Element[],
    renderY: JSX.Element[],
    num: number | string,
    limpar: string,
    casasDecimais: number,
    modo1: boolean,
    modo2: boolean,
    backModo1: string,
    backModo2: string,
    x: number | string,
    y: number | string
  }

  constructor(props: Props){
    super(props)
    this.listaNumeros = []

    this.x = []
    this.y = []

    this.state = {
      render: this.renderListaNumeros(),
      renderX: this.renderX(),
      renderY: this.renderY(),
      num: '',
      limpar: 'block',
      casasDecimais: 2,
      modo1: true,
      modo2: false,
      backModo1: 'rgb(173, 173, 173)',
      backModo2: 'rgb(240, 240, 240)',
      x: '',
      y: ''
    }
  }

  setNum(e: ChangeEvent<HTMLInputElement>):void{
    this.setState({
      num: e.target.value
    })
  }
  setCasasDecimais(e: ChangeEvent<HTMLInputElement>): void{ 
      this.setState({
        casasDecimais: e.target.value
      })
  }
  setModo1(): void{
    this.setState({
      modo1: true,
      modo2: false,
      backModo1: 'rgb(173, 173, 173)',
      backModo2: 'rgb(240, 240, 240)'
    })
  }
  setModo2(): void{
    this.setState({
      modo1: false,
      modo2: true,
      backModo2: 'rgb(173, 173, 173)',
      backModo1: 'rgb(240, 240, 240)'
    })
  }
  setX(e: ChangeEvent<HTMLInputElement>): void{
    this.setState({x: e.target.value})
  }
  setY(e: ChangeEvent<HTMLInputElement>): void{
    this.setState({y: e.target.value})
  }

  excluirNum(e: any):  void{
    if(this.state.modo1){
      let selecionados: object[] = []
      this.listaNumeros.map(
        (numero: {id?: number}) => {
          if(e.target.dataset.indice != numero.id){
            selecionados.push(numero)
          }
        }
      )
      this.listaNumeros = selecionados
      this.setState({
        num: '',
        render: this.renderListaNumeros()
      })
    }
    else{
      let selecionados: object[] = []
      if(e.target.dataset.list == 'x'){
        this.x.map(
          (numero: {id?: number}) => {
            if(e.target.dataset.indice != numero.id){
              selecionados.push(numero)
            }
          }
        )
        this.x = selecionados
        this.setState({
          x: '',
          renderX: this.renderX()
        })
      }
      else{
        this.y.map(
          (numero: {id?: number}) => {
            if(e.target.dataset.indice != numero.id){
              selecionados.push(numero)
            }
          }
        )
        this.y = selecionados
        this.setState({
          y: '',
          renderY: this.renderY()
        })
      }
    }
  }

  renderListaNumeros(): JSX.Element[]{
    return this.listaNumeros.map(
      (numero: {id?: number, num?: number}) => <p className='numAdicionado'>
        {numero.num}
        <button className='excluir' onClick={(e)=>this.excluirNum(e)} data-indice={numero.id}>
          X
        </button>
      </p>
      
    )
  }
  renderX(): JSX.Element[]{
    return this.x.map(
      (numero: {id?: number, num?: number}) => <p className='numAdicionado'>
        {numero.num}
        <button className='excluir' onClick={(e)=>this.excluirNum(e)} data-indice={numero.id}  data-list='x'>
          X
        </button>
      </p>
    )
  }
  renderY(): JSX.Element[]{
    return this.y.map(
      (numero: {id?: number, num?: number}) => <p className='numAdicionado'>
        {numero.num}
        <button className='excluir' onClick={(e)=>this.excluirNum(e)} data-indice={numero.id}  data-list='y'>
          X
        </button>
      </p>
    )
  }

  adicionar(e: KeyboardEvent): void{
    let chave: number = Math.random() * 999999
    if(this.state.num != ''){
      if(e.key == 'Enter'){
        this.listaNumeros.push({id: chave, num: this.state.num})
        this.setState({
          num: '',
          render: this.renderListaNumeros()
        })
      }
    }
  }
  adicionarX(e: KeyboardEvent): void{
    let chave: number = Math.random() * 999999
    if(this.state.x != ''){
      if(e.key == 'Enter'){
        this.x.push({id: chave, num: this.state.x})
        this.setState({
          renderX: this.renderX(),
          x: ''
        })
      }
    }
  }
  adicionarY(e: KeyboardEvent): void{
    let chave: number = Math.random() * 999999
    if(this.state.y != ''){
      if(e.key == 'Enter'){
        this.y.push({id: chave, num: this.state.y})
        this.setState({
          renderY: this.renderY(),
          y: ''
        })
      }
    }
  }

  limparTudoDisplay(): JSX.Element | undefined{
    if(this.state.modo1){
      if(this.listaNumeros.length > 0){
        return (
          <>
            <button className='calc' style={{display: this.state.limpar}} onClick={()=>this.limparTudo()}>
                  Limpar tudo
              </button>
          </>
        )
      }
      else{
        return (<></>)
      }
    }
  }
  limparXDisplay(): JSX.Element | undefined{
    if(this.x.length > 0){
      return(
        <>
          <button className='calc' onClick={()=>this.limparX()}>
            Limpar X
          </button>
        </>
      )
    }
  }
  limparYDisplay(): JSX.Element | undefined{
    if(this.y.length > 0){
      return(
        <>
          <button className='calc' onClick={()=>this.limparY()}>
            Limpar Y
          </button>
        </>
      )
    }
  }

  limparTudo(): void{
    if(this.state.modo1){
      this.listaNumeros = []
      this.setState({
        render: this.renderListaNumeros()
      })
    }
  }
  limparX(): void{
    this.x = []
    this.setState({
      renderX: this.renderX()
    })
  }
  limparY(): void{
    this.y = []
    this.setState({
      renderY: this.renderY()
    })
  }

  renderModo(): JSX.Element{
    if(this.state.modo1){
      return(
        <>
          <section className='box'>
              <div className='tittle'>
                <h2>Números</h2>
                {this.limparTudoDisplay()}
              </div>
              <div className='num'>
                <div className='numerosAdicionados'>
                  {this.state.render}
                </div>
                <div> 
                  <input type="number" placeholder='Adicione os números aqui (Enter para adicionar)' className='inputAd' value={this.state.num} onChange={(e)=>this.setNum(e)} onKeyDown={(e)=>this.adicionar(e)}/>
                </div>
                <div>
                  <label htmlFor="cs">Casas decimais do resultado:</label><br/>
                  <input type="number" id="cs" style={{width: '200px'}} value={this.state.casasDecimais} onChange={(e)=>this.setCasasDecimais(e)} />
                </div>
              </div>
          </section>
          <section className='calc box'>
            <h2>Cálculos</h2>
            <Calculos list={this.listaNumeros} x={this.x} y={this.y} casasDecimais={this.state.casasDecimais} modo={this.state.modo1}/>
          </section>
        </>
      )
    }
    else{
      return(
        <>
          <section className='box'>
            <div className='tittle'>
              <h2>Números</h2>
            </div>
            <div>
              <div className='divLimpar'>
                  <span style={{gridColumn: '1 / 2'}}>
                    {this.limparXDisplay()}
                  </span>
                  <span style={{gridColumn: '2 / 3'}}>
                    {this.limparYDisplay()}
                  </span>
              </div>
              <div className='numerosAdicionados2' style={{gridColumn: '1 / 3'}}>
                  <div>
                    {this.state.renderX}
                  </div>
                  <div>
                    {this.state.renderY}
                  </div>
              </div>
              <div  className='num2'>
                <input type="number" id="x" placeholder='X (Enter para adicionar)' className='inputAd modo2' onChange={(e)=>this.setX(e)} onKeyDown={(e)=>this.adicionarX(e)} value={this.state.x}/>
                <input type="number" id="y" placeholder='Y (Enter para adicionar)' className='inputAd modo2' onChange={(e)=>this.setY(e)} onKeyDown={(e)=>this.adicionarY(e)} value={this.state.y}/>
              </div>
              <div>
                  <label htmlFor="cs">Casas decimais do resultado:</label><br/>
                  <input type="number" id="cs" style={{width: '200px'}} value={this.state.casasDecimais} onChange={(e)=>this.setCasasDecimais(e)} />
              </div>
            </div>
          </section>
          <section className='calc box'>
            <h2>Cálculos</h2>
            <Calculos list={this.listaNumeros} x={this.x} y={this.y} casasDecimais={this.state.casasDecimais} modo={this.state.modo1}/>
          </section>
        </>
      )
    }
  }

  render(): React.ReactNode {
    return(
      <>
        <header>
          <div onClick={()=>this.setModo1()} style={{backgroundColor: this.state.backModo1}}>
            Modo 1
          </div>
          <div onClick={()=>this.setModo2()} style={{backgroundColor: this.state.backModo2}}>
            Modo 2
          </div>
        </header>
        <main>
          {this.renderModo()}
        </main>
      </>
    )
  }
    
}


