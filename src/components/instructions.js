import React, { Fragment, Component } from 'react';
import '../styles/instruction.scss';
import MainImage from '../assets/MainImage.png';

class Instruction extends Component{
    state = {
        content: '', content2: ''
    }

    Unilevel = () => {
        this.setState({ content: 'here are the university Level instructions+'});
        this.setState({ content2: 'whatever it takes'});
    };

    Scllevel = () => {
        this.setState({ content: 'here are the school level instruction' });
        this.setState({ content2: ''});
    };

    render() {
        return (
            <Fragment>
                <div id='instructions' >        
                        <section>
                        <div>
                        <button className='button' onClick={this.Unilevel}> Uni Instruction</button>
                        <button className='button' onClick={this.Scllevel}> School Instruction</button>
                        </div><div id='left'>
                        <h1>{this.state.content}</h1>
                        <a>{this.state.content2}</a>
                        </div>
                        <div id='right'>
                        <img className='img' src={MainImage} />   
                        </div>
                        </section> 
                        
                </div>
            </Fragment>    
            
        );
    }
}
export default Instruction;
