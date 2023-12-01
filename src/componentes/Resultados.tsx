import React, { ChangeEvent } from 'react'

interface Props {
    st: number,
    var: number,
    cov: number,
    med: number,
    media: number,
    desv: number,
    correl: number,
    amplitude: number,
    rol: number[],
}

export default class Resultados extends React.Component<Props>{

    state: {
        st: number,
        var: number,
        cov: number,
        med: number,
        media: number,
        desv: number,
        correl: number,
        amplitude: number,
        rol: number[],
    }
    constructor(props: Props){
        super(props)

        this.state = {
            st: 0,
            var: 0,
            cov: 0,
            med: 0,
            media: 0,
            desv: 0,
            correl: 0,
            amplitude: 0,
            rol: []
        }
    }

    //setModa(): void{ this.setState({moda: this.props.moda}) }
    

    resultados(txt: string, state: number | number[]): JSX.Element{
        return(
            <>
                <p>
                    {txt}: {state} 
                </p>
            </>
        )
    }

    render(): React.ReactNode{
        return(
            <>
                {/*this.resultados('Moda', this.state.moda)*/}
                {this.resultados('Soma total', this.state.st)}
                {this.resultados('Variância', this.state.var)}
                {this.resultados('Mediana', this.state.med)}
                {this.resultados('Média', this.state.media)}
                {this.resultados('Desvio padrão', this.state.desv)}
                {this.resultados('Amplitude', this.state.amplitude)}
                {this.resultados('Rol', this.state.rol)}
            </>
        )
    }
}