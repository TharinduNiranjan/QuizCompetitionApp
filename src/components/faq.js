import React, { Fragment, Component } from 'react';
import '../styles/faq.scss';
import Accordion from './FAQ/Accordion';
import AccordionItem from './FAQ/AccordionItem';
import '../styles/Accordion.scss';

class Faq extends Component{
    render() {
        const DummyContent=()=>(
            <p>What ever the fuck this is</p>
        );
        const DummyContent2=()=>(
            <p>What fddfifdsonvf vfksnkds fskfmsdf</p>
        );
        return (
            <Fragment>
                <div className="row" id="navbar">
                <div >μMora Mathematics Competition 2020</div>
                </div>
                <div id='faq' >
                <section>
                <Accordion atomic={true}>
                    <AccordionItem title="Question 01">
                        <DummyContent />
                    </AccordionItem>
                    <AccordionItem title="Question 02">
                        <DummyContent2 />
                    </AccordionItem>
                    <AccordionItem title="Question 03">
                        <DummyContent />
                    </AccordionItem>
                </Accordion>
                </section>
                </div>     
            </Fragment>        
        );
    }
    
}
export default Faq;
