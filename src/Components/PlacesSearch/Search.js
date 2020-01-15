import React, { Fragment, useState, useEffect, useRef } from 'react';
import './Search.css';
import { searchJson} from '../../Json/Json'
import {windowClick,removeWindowClick} from '../../Utils/utils'


const Search = props =>{
    const {setComponent=()=>{},onChange=()=>{}} = props;
    const [placeList,setPlaceList] = useState([]);
    const [search_val,setSearch_val] = useState('');
    const [show ,setShow] = useState(false);

    useEffect(()=>{
        setPlaceList([...searchJson]);
    },[]);

    useEffect(()=>{
        const {open=false} = props;

        if(open)
        {
            setShow(open)
        }
        else{
            if(search_val !== "")
            {
                
            }
            else{
                setShow(open)
            }
        }
        // if(open)
        // {
        //     setShow(open)
        // }
        // else{
        

        //     if(search_val === "")
        //     {
        //         setShow(open)

        //     }
        //     else{

        //     }


        // }
    },[props])

    const handleChange =value =>{
        // console.log("The mai outrer Sn search handle cahneg called ")
        setSearch_val(value)
        onChange(value,"place")
    }

    const ipStyles={
        marginLeft:'13.5%',

    }

    const handleShow=()=>
    {        
        setShow(true);
        setComponent("search");
    }

    const mainSearch = <div className="h50">
                        <SearchBar close={e=>setShow(false)} inputProps={{style:ipStyles,placeHolder:"City"}} onChange={handleChange} value={search_val} options={placeList} />
                    </div>

    return(
        <Fragment>
            <div className="search-outer-main" onClick={e=>{e.stopPropagation();handleShow();}}>
                <div className={show ? "search-title-2" :"search-title-1"} onClick={e=>handleShow()}>
                    where to?
                </div>

                {show && mainSearch}
            
            </div>       
        </Fragment>
    )
}


const SearchBar = props=>{
    const {onChange=()=>{},close=()=>{}} = props;
    const [options,setOptions] = useState([]);
    const [state,setState] =useState('');
    const _searchInput = useRef();
    const [ipProps,setIpProps] = useState({placeHolder:'',style:{},className:""})
    const [show,setShow] = useState(true);
    useEffect(()=>{
        if(_searchInput !== null && _searchInput !== "")
        {
            // console.log("the input ref is ",_searchInput.getInputDOMNode);

        }

        const input_doc = document.getElementById("input1");

        // console.log("the normal document function ",input_doc.focus())

        windowClick(()=>{
                    setShow(false)            
        });

        return ()=>{removeWindowClick(()=>{
            // console.log("Removed event listener")
        })
        }


    },[])

    const check =()=>{
        // console.log("the checked is called ",state)
        if(state === '')
        {
            // console.log("The state value is ",state);

        }
        else{
            // console.log("the else state ",state)
        }
    }

    useEffect(()=>{
        const {options:op = []} = props;
        setOptions([...op]);
    },[props.options]);

    useEffect(()=>{
        const {value=""} = props;
        setState(value);
    },[props.value]);

    useEffect(()=>{
        const {inputProps={style:{},placeHolder:''}} = props;
        setIpProps({...inputProps});
    },[props.inputProps])

    // useEffect(()=>{
    //     onChange(state);
    // },[state]);
    


    const handleChange=event=>{
        // console.log("The event is ",event)
        setState(event.target.value);
        onChange(event.target.value);

        

    }

    const handleClick = value =>
    {
        // console.log("The hand;e click called")
        setState(value);
        onChange(value);
        
    }

    const NearHotel = <div></div>
    const SearchList = options.map((item,key)=>{
        return <SearchItems key={key} onClick={handleClick} value={item}/>
    })

    return(
        <Fragment>
            <div className="search-div">
                <input style={{...ipProps.style}} onFocus={e=>setShow(true)} autoFocus ref={_searchInput} id="input1" className="search-input" placeholder={ipProps.placeHolder} value={state} onChange={handleChange}/>
                {show && <div className="input-options">
                    { SearchList}
                </div>}
            </div>
        </Fragment>
    )
}

const SearchItems = props =>
{
    const {onClick=()=>{}} = props;
    const [state,setState] = useState({name:'',type:'',value:''});
    
    useEffect(()=>{
        const {value={name:'',type:'',value:''}} = props;
        setState({...value})
    },[props.value]);

    const handleClick =()=>{
        onClick(state.value);
    }

    return(
        <Fragment>
        <div onClick={handleClick} className="search-option-item">
            <div className="search-option-city">
                {state.name}
            </div>
            <div className="search-option-type">
                {state.type}
    
            </div>
        </div>
        </Fragment>
    
    )
}

    




export default Search;