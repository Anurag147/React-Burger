import React from 'react';
import Classes from './Input.css';

const input = (props) => {
    let inputElement=null;
    let classCss='';
        if(props.isValid){
            classCss = Classes.InputElement
        }
        else{
            classCss= Classes.InputElement
        }

    switch(props.elementtype){

            case ('input'):
            inputElement= <input className={classCss} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;

            case ('textarea'):
            inputElement=<textarea className={classCss} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;

            case ('select'):
                    inputElement=<select className={Classes.InputElement} 
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option=>(
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}                    
                    </select>
                    break;
            
            default:
            inputElement= <input className={Classes.InputElement} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;
    }

    return(
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;