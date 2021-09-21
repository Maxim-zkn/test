import React from 'react';

export const Calculator: React.FC = () => {
    const [number, setNumber] = React.useState('');
    let res = React.useRef<string>('');

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if( isNaN(Number(e.target.value)) && e.target.value !== ''  && e.target.value !== '-' ){
            return;
        }
        setNumber(e.target.value);
    };

    const calc = (e: React.MouseEvent<HTMLInputElement>) => {
        if(!isNaN(Number(number))){
            const operand = Number(number);
            setNumber('');
            res.current += operand;
            res.current += e.currentTarget.value;
        }
    };

    const handleRes = () => {
        if(isNaN(Number(res.current.slice(-1)))){
            if(!isNaN(Number(number))){
                res.current += Number(number);
            } else {
                res.current = res.current.slice(0, -1);
            }
        }
        setNumber(eval(res.current));
        res.current = '';
    };

    return (
        <form>
            <label>
                <div>Value:</div>
                <input type="text" value={number} onChange={handleNumberChange} />
            </label>
            <div>
                <input type="button" value="+" onClick={calc}/>
                <input type="button" value="-" onClick={calc}/>
                <input type="button" value="*" onClick={calc}/>
                <input type="button" value="/" onClick={calc}/>
                <input type="button" value="=" onClick={handleRes}/>
            </div>
        </form>
    );
}