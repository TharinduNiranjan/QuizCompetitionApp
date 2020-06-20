import React, { Fragment, Component } from 'react';
import '../styles/instruction.scss';


class Instruction extends Component{
    state = {
        content: '', content2: ''
    }

    Unilevel = () => {
        this.setState({ content: 'University Level instructions'});
        this.setState({ content2: ' mini-header'});
        this.setState({ content3: 'All the content under mini header'})
        this.setState({ content4: 'This is the second part'})
    };

    Scllevel = () => {
        this.setState({ content: 'here are the school level instruction' });
        this.setState({ content2: ' '});
        this.setState({ content3: ' '})
        this.setState({ content4: ' '})
    };

    render() {
        return (
            <Fragment>
                
                <div className="row" id="navbar">
                <div >μMora Mathematics Competition 2020</div>
                <div id="logo">
                    <img src={Img} id="logoimg" />
                </div>
                </div>
                <div id='instructions' > 
                <section>       
                        <div>
                        <button className='button' onClick={this.Unilevel}> University Instruction</button>
                        <div className='divider'/>
                        <button className='button' onClick={this.Scllevel}> School Instruction</button>
                        </div>
                        <div id='left'>
                        <h3> {this.state.content}</h3>
                        <h2>{this.state.content2}</h2>
                        <h3>{this.state.content3}</h3>
                        <h2>{this.state.content4}</h2>
                        </div>
                        </section>
                    </div>
                  
                    
            </Fragment>    
            
        );
    }
    
}

export default Instruction;
