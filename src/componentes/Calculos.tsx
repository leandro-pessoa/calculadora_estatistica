import React, {ChangeEvent, ChangeEventHandler} from 'react'

import Resultados from '../componentes/Resultados'

import expandirMais from '../componentes/imagens/expandir-mais.svg'
import expandirMenos from '../componentes/imagens/expandir-menos.svg'

interface Props {
    list: object[],
    casasDecimais: number,
    modo: boolean,
    x: object[],
    y: object[]
}

export default class Calculos extends React.Component<Props>{

    state: {
        moda: boolean,
        st: boolean,
        var: boolean,
        cov: boolean,
        med: boolean,
        media: boolean,
        mediaGeo: boolean,
        desv: boolean,
        correl: boolean,
        amplitude: boolean,
        rol: boolean,
        rolX: boolean,
        rolY: boolean,
        regLinear: boolean
        aberto: boolean,
        resAlt: string,
        resModa: number[] | string,
        resSt: number,
        resVar: number,
        resCov: number,
        resMed: number,
        resMedia: number,
        resMediaGeo: number,
        resDesv: number,
        resCorrel: number,
        resAmplitude: number,
        resRol: number[],
        resRolX: number[],
        resRolY: number[],
        resRegLinear: string
        calculado: boolean,
        csInvalida: string,
        listaVazia: string,
        tamanhoInvalido: string,
        qntInvalida: string
    }

    constructor(props: Props){
        super(props)

        this.state = {
            moda: false,
            st: false,
            var: false,
            cov: false,
            med: false,
            media: false,
            mediaGeo: false,
            desv: false,
            correl: false,
            amplitude: false,
            rol: false,
            rolX: false,
            rolY: false,
            regLinear: false,
            aberto: false,
            resAlt: '0px',
            resModa: '',
            resSt: 0,
            resVar: 0,
            resCov: 0,
            resMed: 0,
            resMedia: 0,
            resMediaGeo: 0,
            resDesv: 0,
            resCorrel: 0,
            resAmplitude: 0,
            resRol: [],
            resRolX: [],
            resRolY: [],
            resRegLinear: '',
            calculado: false,
            csInvalida: 'none',
            listaVazia: 'none',
            tamanhoInvalido: 'none',
            qntInvalida: 'none'
        }
    }

    setModa(): void{ this.setState({moda: !this.state.moda}) }
    setSt(): void{ this.setState({st: !this.state.st}) }
    setVar(): void{ this.setState({var: !this.state.var}) }
    setCov(): void{ this.setState({cov: !this.state.cov}) }
    setMed(): void{ this.setState({med: !this.state.med}) }
    setMedia(): void{ this.setState({media: !this.state.media}) }
    setMediaGeo(): void{ this.setState({mediaGeo: !this.state.mediaGeo})}
    setDesv(): void{ this.setState({desv: !this.state.desv}) }
    setCorrel(): void{ this.setState({correl: !this.state.correl}) }
    setAmplitude(): void { this.setState({amplitude: !this.state.amplitude}) }
    setRegLinear(): void { this.setState({regLinear: !this.state.regLinear}) }

    setResModa(): void{ this.setState({moda: this.state.resModa})}
    setResSt(): void{ this.setState({st: this.state.resSt}) }
    setresVar(): void{ this.setState({var: this.state.resVar}) }
    setResCov(): void{ this.setState({cov: this.state.resCov}) }
    setResMed(): void{ this.setState({med: this.state.resMed}) }
    setResMedia(): void{ this.setState({media: this.state.resMedia}) }
    setResMediaGeo(): void{ this.setState({mediaGeo: this.state.resMediaGeo})}
    setResDesv(): void{ this.setState({desv: this.state.resDesv}) }
    setResCorrel(): void{ this.setState({correl: this.state.resCorrel}) }
    setResAmplitude(): void{ this.setState({amplitude: this.state.resAmplitude}) }
    setResRol(): void{ this.setState({rol: this.state.resRol })}
    setResRolX(): void{ this.setState({rolX: this.state.resRolX}) }
    setResRolY(): void{ this.setState({rolY: this.state.resRolY}) }
    setResRegLinear(): void{ this.setState({regLinear: this.state.resRegLinear}) }

    blockCalculado(): void{ this.setState({calculado: false, resAlt: '0px'}) }

    setResAlt(): void{
        if(this.state.calculado){
            if(this.state.aberto){
                this.setState({
                    resAlt: '20px',
                    aberto: !this.state.aberto
                })
            }
            else{
                this.setState({
                    resAlt: 'calc(100%)',
                    aberto: !this.state.aberto
                })
            }
        }
    }
    resImg(): string | undefined{
        if(this.state.calculado){
            if(this.state.aberto){
                return expandirMais
            }
            else{
                return expandirMenos
            }
        }
    }

    checkedtest(state: boolean): boolean{
        if(state){
            return true
        }
        else{
            return false
        }
    }

    checkbox(funcao: ChangeEventHandler<HTMLInputElement> | undefined, id: string, legenda: string, state: boolean): JSX.Element{
        return (
            <>
                <p>
                    <input type="checkbox" id={id}  onChange={funcao} onClick={()=>this.blockCalculado()} checked={this.checkedtest(state)}/>
                    <label htmlFor={id}>{legenda}</label>
                </p>
            </>
        )
    }

    calcular(): void{
        if(this.props.modo){
            if(this.props.list[0] == null){
                this.setState({listaVazia: 'block', tamanhoInvalido: 'none', qntInvalida: 'none'})
            }
            else if(this.props.casasDecimais < 0 || this.props.casasDecimais > 8){
                this.setState({csInvalida: 'block', listaVazia: 'none', tamanhoInvalido: 'none', qntInvalida: 'none'})
            }
            else{
                this.setState({
                    calculado: true,
                    csInvalida: 'none',
                    listaVazia: 'none',
                    tamanhoInvalido: 'none',
                    qntInvalida: 'none'
                })

                let listaNumerosSemId: number[] = []
                this.props.list.map(
                    (numero: {num?: number}) => {
                        listaNumerosSemId.push(Number(numero.num))
                    }
                )
                
                //cálculo da soma
                let soma: number = 0
                for(let n = 0; n < listaNumerosSemId.length; n++){
                    soma += listaNumerosSemId[n]
                }

                //cálculo da média
                let media: number = soma / listaNumerosSemId.length

                // cálculo da variância
                let somatorio: number = 0
                for(let n = 0; n < listaNumerosSemId.length; n++){
                    somatorio += (listaNumerosSemId[n] - media) ** 2
                }
                let variancia: number = somatorio / (listaNumerosSemId.length - 1)

                //cálculo do desvio padrão
                let desv: number = Math.sqrt(variancia)

                //formação do rol
                function compararNumeros(a: number, b: number) {
                    return a - b;
                }
                let rol: number[] = listaNumerosSemId.sort(compararNumeros)
                this.setState({
                    resRol: rol.map(
                        (num) => <span style={{ margin: '5px', fontSize: '1.2em', marginBottom: '5px', textAlign: 'center'}}>
                            {num}
                        </span>
                    )
                })

                //atribuição dos resultados

                //cálculo da moda
                if(this.state.moda){
                    let frequencia: number[] = []
                    let maxFreq: number = 0
                    let moda: number[] = []

                    for (let i in listaNumerosSemId) {
                        frequencia[listaNumerosSemId[i]] = (frequencia[listaNumerosSemId[i]] || 0) + 1

                        if (frequencia[listaNumerosSemId[i]] > maxFreq) {
                            maxFreq = frequencia[listaNumerosSemId[i]]
                        }
                    }
                    for(let j in frequencia){
                        if(frequencia[j] == maxFreq && maxFreq > 1){
                            moda.push(Number(j))
                        }
                    }
                    if(moda[0] == null){
                        this.setState({resModa: 'inexistente'})
                    }
                    else{
                        this.setState({
                            resModa: moda.map(
                                (num) => <span style={{margin: '5px'}}>
                                    {num}
                                </span>
                            )
                        })
                    }
                }

                //soma total
                if(this.state.st){
                    this.setState({resSt: soma.toFixed(this.props.casasDecimais)})
                }

                //variância
                if(this.state.var){
                    this.setState({resVar: variancia.toFixed(this.props.casasDecimais)})
                }

                //mediana
                if(this.state.med){
                    let mediana: number = 0
                    for(let n = 0; n <= rol.length; n++){
                        if(rol.length % 2 == 1){
                            let meioImpar: number = Math.floor(rol.length / 2)
                            mediana = rol[meioImpar]
                        }
                        else{
                            let esquerda: number = Math.floor(rol.length / 2) - 1
                            let direita: number = Math.floor(rol.length / 2)
                            let meioPar: number = (rol[direita] + rol[esquerda]) / 2
                            mediana = meioPar
                        }
                    }
                    this.setState({resMed: mediana.toFixed(this.props.casasDecimais)})
                }

                //media
                if(this.state.media){
                    this.setState({resMedia: media.toFixed(this.props.casasDecimais)})
                }

                //cálculo da media geométrica
                if(this.state.mediaGeo){
                    let mediaGeometrica: number
                    let multiplicacaoTotal: number = 1
                    for(let i in listaNumerosSemId){
                        multiplicacaoTotal *= listaNumerosSemId[i]
                    }
                    mediaGeometrica = Math.pow(multiplicacaoTotal, 1/listaNumerosSemId.length)
                    this.setState({resMediaGeo: mediaGeometrica.toFixed(this.props.casasDecimais)})
                }

                //desvio padrão
                if(this.state.desv){
                    this.setState({resDesv: desv.toFixed(this.props.casasDecimais)})
                }
                
                //cálculo da amplitude
                if(this.state.amplitude){
                    let amplitude: number = rol[rol.length - 1] - rol[0]
                    this.setState({resAmplitude: amplitude.toFixed(this.props.casasDecimais)})
                }
                this.setState({
                    resAlt: 'calc(100%)',
                    aberto: !this.state.aberto,
                    resultados: 'modo1'
                })
            }
        }
        else{
            if(this.props.x[0] == null || this.props.y[0] == null){
                this.setState({listaVazia: 'block'})
            }
            else if(this.props.x.length != this.props.y.length){
                this.setState({tamanhoInvalido: 'block'})
            }
            else if(this.props.x.length < 2 || this.props.y.length < 2){
                this.setState({qntInvalida: 'block'})
            }
            else if(this.props.casasDecimais < 0 || this.props.casasDecimais > 8){
                this.setState({csInvalida: 'block', listaVazia: 'none', tamanhoInvalido: 'none', qntInvalida: 'none'})
            }
            else{
                
                this.setState({
                    calculado: true,
                    csInvalida: 'none',
                    listaVazia: 'none',
                    tamanhoInvalido: 'none',
                    qntInvalida: 'none',
                    resultados: 'modo2'
                })

                let x: number[] = []
                let y: number[] = []

                function soma(array: number[]): number{
                    let soma: number = 0
                    for(let n in array){
                        soma += array[n]
                    }
                    return soma
                }
                function soma_2(array: number[]): number{
                    let soma: number = 0
                    for(let i in array){   
                        soma += Math.pow(array[i], 2)
                    }
                    return soma
                }
                function media(soma: number, array: number[]): number{
                    return soma / array.length
                }

                this.props.x.map(
                    (numero: {num?: number}) => x.push(Number(numero.num))
                )
                this.props.y.map(
                    (numero: {num?: number}) => y.push(Number(numero.num))
                )

                function compararNumeros(a: number, b: number) {
                    return a - b;
                }

                if(this.state.cov){
                    let valoresX: number[] = []
                    let valoresY: number[] = []
                    let produtos: number[] = []
                    let somaProdutos: number = 0
                    for(let i in x){
                        valoresX.push(x[i] - media(soma(x), x))
                    }
                    for(let i in y){
                        valoresY.push(y[i] - media(soma(y), y))
                    }
                    for(let i in valoresX){
                        produtos.push(valoresX[i] * valoresY[i])
                    }
                    for(let i in produtos){
                        somaProdutos = soma(produtos)
                    }
                    let covariancia = somaProdutos / (valoresX.length - 1)
                    console.log(covariancia.toFixed(this.props.casasDecimais))
                    this.setState({resCov: covariancia.toFixed(this.props.casasDecimais)})
                }
                if(this.state.correl){
                    let somaX: number = soma(x)
                    let somaY: number = soma(y)
                    let somaX_2: number = soma_2(x)
                    let somaY_2: number = soma_2(y)
                    let produtosXY: number = 0
                    for(let i in x){
                        produtosXY += x[i] * y[i]
                    }
                    let correlacao: number = (x.length * produtosXY - somaX * somaY) / (Math.sqrt(x.length * somaX_2 - Math.pow(somaX, 2)) * Math.sqrt(x.length * somaY_2 - Math.pow(somaY, 2)))
                    this.setState({resCorrel: correlacao.toFixed(this.props.casasDecimais)})
                    
                }
                if(this.state.regLinear){
                    let somaX: number = soma(x)
                    let somaY: number = soma(y)
                    let somaX_2: number = soma_2(x)
                    let somaY_2: number = soma_2(y)
                    let produtosXY: number = 0
                    for(let i in x){
                        produtosXY += x[i] * y[i]
                    }
                    let b: number = (x.length * produtosXY - somaX * somaY) / (x.length * somaX_2 - Math.pow(somaX, 2))
                    let a: number = media(soma(y), y) - b * media(soma(x), x)
                    
                    let sinal: string = ''
                    if(b > 0){
                        sinal = '+'
                    }
                    else{
                        sinal = ''
                    }
                    this.setState({resRegLinear: `y = ${a.toFixed(this.props.casasDecimais)} ${sinal} ${b.toFixed(this.props.casasDecimais)}x`})
                }
                let rolX: number[] = x.sort(compararNumeros)
                this.setState({
                    resRolX: rolX.map(
                        (num) => <span style={{ margin: '5px', fontSize: '1.2em', marginBottom: '5px', textAlign: 'center'}}>
                            {num}
                        </span>
                    )
                })
                let rolY: number[] = y.sort(compararNumeros)
                this.setState({
                    resRolY: rolY.map(
                        (num) => <span style={{ margin: '5px', fontSize: '1.2em', marginBottom: '5px', textAlign: 'center'}}>
                            {num}
                        </span>
                    )
                })
                this.setState({
                    resAlt: 'calc(100%)',
                    aberto: !this.state.aberto
                })
            }
        }
    }

    resultados(txt: string, state: number | number[] | string, condicao: boolean): JSX.Element | undefined{
        if(condicao){
            return(
                <>
                    <p>
                        {txt}: {state} 
                    </p>
                </>
            )
        }
    }

    renderModo(): JSX.Element| undefined{
        if(this.props.modo){
            return(
                <>
                    <div className='calc'>
                        {this.checkbox(()=>this.setModa(), 'moda', 'Moda', this.state.moda)}
                        {this.checkbox(()=>this.setSt(), 'st', 'Soma total', this.state.st)}
                        {this.checkbox(()=>this.setAmplitude(), 'amplitude', 'Amplitude', this.state.amplitude)}
                        {this.checkbox(()=>this.setMed(), 'med', 'Mediana', this.state.med)}
                        {this.checkbox(()=>this.setMedia(), 'mediaAr', 'Média aritmética', this.state.media)}
                        {this.checkbox(()=>this.setMediaGeo(), 'mediaGeo', 'Média geométrica', this.state.mediaGeo)}
                        {this.checkbox(()=>this.setVar(), 'var', 'Variância', this.state.var)}
                        {this.checkbox(()=>this.setDesv(), 'desv', 'Desvio padrão', this.state.desv)}
                    </div><hr style={{marginTop: '10px'}}/>
                    <div>
                        <button onClick={()=>this.calcular()} style={{marginTop: '10px'}} className='calc'>
                            Calcular
                        </button>
                        <p style={{color: 'red', fontSize: '0.9em', display: this.state.listaVazia}}>
                            Não há conjunto de dados
                        </p>
                        <p style={{color: 'red', fontSize: '0.9em', display: this.state.csInvalida}}>
                            Número de casas decimais inválido [min: 0 e max: 8]
                        </p>
                    </div>
                    <section className='res' style={{height: this.state.resAlt}}>
                        <button onClick={()=>this.setResAlt()}>
                        <img src={this.resImg()}/>
                        </button>
                        <div>
                            <h2>Resultado(s)</h2>
                            <hr style={{marginTop: '7px', marginBottom: '8px'}}/>
                            <div className='rol'>
                                {this.state.resRol}
                            </div><hr style={{ marginTop: '10px', marginBottom: '5px'}}/>
                            <div className='resultados'>
                                {this.resultados('Moda(s)', this.state.resModa, this.state.moda)}
                                {this.resultados('Soma total', this.state.resSt, this.state.st)}
                                {this.resultados('Variância', this.state.resVar, this.state.var)}
                                {this.resultados('Mediana', this.state.resMed, this.state.med)}
                                {this.resultados('Média aritmética', this.state.resMedia, this.state.media)}
                                {this.resultados('Média geométrica', this.state.resMediaGeo, this.state.mediaGeo)}
                                {this.resultados('Desvio padrão', this.state.resDesv, this.state.desv)}
                                {this.resultados('Amplitude', this.state.resAmplitude, this.state.amplitude)}
                            </div>
                        </div>
                    </section>
                </>
            )
        }
        else{
            return(
                <>
                    <div className='calc'>
                        {this.checkbox(()=>this.setCov(), 'cov', 'Covariância', this.state.cov)}
                        {this.checkbox(()=>this.setCorrel(), 'correl', 'Correlação', this.state.correl)}
                        {this.checkbox(()=>this.setRegLinear(), 'reg', 'Regressão linear', this.state.regLinear)}
                    </div>
                    <hr style={{marginTop: '10px'}}/>
                    <div>
                        <button onClick={()=>this.calcular()} style={{marginTop: '10px'}} className='calc'>
                            Calcular
                        </button>
                        <p style={{color: 'red', fontSize: '0.9em', display: this.state.listaVazia}}>
                            Não há conjunto de dados
                        </p>
                        <p style={{color: 'red', fontSize: '0.9em', display: this.state.csInvalida}}>
                            Número de casas decimais inválido [min: 0 e max: 8]
                        </p>
                        <p style={{color: 'red', fontSize: '0.9em', display: this.state.tamanhoInvalido}}>
                            As variáveis devem ter o mesmo tamanho
                        </p>
                        <p style={{color: 'red', fontSize: '0.9em', display: this.state.qntInvalida}}>
                            As variáveis devem ter 2 ou mais elementos
                        </p>
                    </div>
                    <section className='res' style={{height: this.state.resAlt}}>
                        <button onClick={()=>this.setResAlt()}>
                        <img src={this.resImg()}/>
                        </button>
                        <div>
                            <h2>Resultado(s)</h2>
                            <hr style={{marginTop: '7px', marginBottom: '8px'}}/>
                            <div className='rol2'>
                                <div className='rol'>
                                    <h3 style={{gridColumn: ' 1 / 11'}}>
                                        Rol de X
                                    </h3>
                                    {this.state.resRolX}
                                </div>
                                <div className='rol'>
                                    <h3 style={{gridColumn: '1 / 11'}}>
                                        Rol de Y
                                    </h3>
                                    {this.state.resRolY}
                                </div>
                            </div><hr style={{ marginTop: '10px', marginBottom: '5px'}}/>
                            <div className='resultados'>
                                {this.resultados('Covariância', this.state.resCov, this.state.cov)}
                                {this.resultados('Correlação', this.state.resCorrel, this.state.correl)}
                                {this.resultados('Regressão linear', this.state.resRegLinear, this.state.regLinear)}
                            </div>
                        </div>
                    </section>
                </>
            )
        }
    }
        
    render(): React.ReactNode {
        return(
            <div>
                {this.renderModo()}
            </div>
        )
    }
}
