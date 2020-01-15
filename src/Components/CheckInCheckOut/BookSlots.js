import React, { Fragment, useRef, useEffect, useState } from 'react';
import './BookSlots.css';
import {windowClick,removeWindowClick} from '../../Utils/utils';

var date = new Date()


const BookSlots = props =>
{
    const {handlSlots=()=>{},setComponent=()=>{}} = props;

    
    const _refDiv  =  useRef();

    const [start,setStart] = useState();
    const [end,setEnd] = useState();
    const [index,setIndex] = useState();
    const [storeIndex,setStoreIndex] = useState({
        end:'',
        start:''
    })

    const [checkin,setCheckin] = useState("")
    const [checkout,setCheckout] = useState("")
    

    const [indexArray,setIndexArray] = useState([])

    const [h_left,setH_Left] = useState(0); 
    const [list,setList] = useState([{time:7,sub:'am'},{time:12,sub:'pm'},{time:7,sub:'pm'}])
    const [oWidth,setOWidth] = useState(0);
    const [open,setOpen] = useState(false)


    useEffect(()=>{
        // console.log("the ref div is "._refDiv)
        windowClick(()=>{
            setOpen(false)            
});

return ()=>{removeWindowClick(()=>{
    // console.log("Removed event listener")
})
}
    },[])

    useEffect(()=>{

        const { open:op =false} = props;
        setOpen(op)
    },[props.open])


    const handleClear =event=>{
        event.stopPropagation();
        setCheckin("");
        setCheckout("");
        setIndexArray([]);
        setIndex();
        setStart();
        setOpen(true);
        setComponent("slot")
        
    }


    const handleOverlays=(ind,x_cor,width)=>
    {   
        // console.log("The handleOverlays called ",ind,width,x_cor)
        let _width 
        let temp_st = ind.split("_");
        var temp_list = indexArray

        if(start !== undefined)
        {
            _width = (x_cor-start)+60
        }
        else{
                _width = 60;
        }

        
        if(_width <= oWidth )
        {

        }

        if(_width>0 && _width > oWidth)
        {
            setOWidth(_width);
            temp_list = [...temp_list,ind]
            setIndexArray([...indexArray,ind])
        }
        else if(_width<oWidth && _width >0){
                
                let inde = temp_list.indexOf(ind);
                temp_list.splice(inde+1,indexArray.length);
                setIndexArray([...temp_list]);
                setOWidth(_width);


        }
        let dat = temp_st[2]+"/"+temp_st[3]+"/"+temp_st[5]
        let slot_ti = temp_st[0]+"-"+temp_st[1];
        // console.log("The solot ",slot_ti)
        var slotTy;

        switch(slot_ti)
        {
            case"7-am": slotTy = 1
                        break;

            case"12-pm": slotTy = 2
            break;
            

            
            case"7-pm": slotTy = 3
            break;
        }



        // console.log("The date converted is ",dat,temp_st)
        // console.log("the width is ",_width)
            if(index ===undefined && start ===undefined)
            {
                setIndex(ind)
                setStart(x_cor)

                setCheckin(dat)
                handlSlots(dat,"","",temp_list,slotTy)

            }
            else
            {
                // console.log("the index is not empty",index,start)
                handlSlots(checkin,dat,"","",slotTy)
                setCheckout(dat)

            }
         
    }

    const datee =() =>
    {
        let dummy =[]
        let year =  date.getFullYear();
        for(let i = date.getMonth();i<=12;++i)
        {       var days
            var month
                    switch(i){
                        case 0: month="Jan"
                                break;
                        case 1: month="Feb"
                        break;

                        case 2: month="Mar"
                        break;

                        case 3: month="Apr"
                        break;

                        case 4: month="May"
                        break;

                        case 5: month="Jun"
                        break;

                        case 6: month="Jul"
                        break;

                        case 7: month="Aug"
                        break;

                        case 8: month="Sep"
                        break;
                        case 9: month="Oct"
                        break;
                        case 10: month="Nov"
                        break;
                        case 11: month="Dec"
                        break;
                        
                            }            
                    switch(i){
                        case 0:
                        case 2:
                        case 4:
                        case 6:
                        case 7:
                        case 9:
                        case 11: days = 31
                                break;
                        case 1: days = 28
                                break;
                        case 3:
                        case 5:
                        case 8:
                        case 10:   days=30
                                    break;

                    }

                    for(let d = date.getDay();d<=days;++d)
                    {
                        var inDate = new Date(`${year}-${month}-${d}`) 
                        var day ;
                        switch(inDate.getDay())
                        {
                            case 0: day="Sunday";break;
                            case 1: day="Monday";break;
                            case 2: day="Tueday";break;
                            case 3: day="Wednesday";break;
                            case 4: day="Thursday";break;
                            case 5: day="Friday";break;
                            case 6: day="Saturday";break;
                             }
                        dummy.push(<td>
                            <div  className="scroll-slot">
                                    <div className="scroll-in-date">
                                        {d}&nbsp;{month}         
                                    </div>

                                    <div className="scroll-in-day">
                                        {day}
                                    </div>


                                    <div className="slots-main-div">
                                       {list.map((i,k)=><Slots array={indexArray} oWidth={oWidth} index={index} onClick={handleOverlays} myIndex={`${i.time}_${i.sub}_${d}_${month}_${day}_${year}`} value={i} key={k}/>)}
                                      
                                    </div>
                                    
                        </div>
                        </td>)
            
                    }
                }

        
        return dummy;
    }


    const handleScroll = mode =>
    {
        switch(mode)
        {
            case "right":  setH_Left(h_left-130)
                        break;
            case "left":if(!(h_left+130 > 0) ){setH_Left(h_left+130) }
                        break;
                    }
    }

    const handleOpen = () =>{

        setOpen(true);
        setComponent("slot");

    }
    return(
        <Fragment>
        <div className="book-slot-main" >
                <div className="book-slot-sub" onClick={e=>{handleOpen()}}>
                    <div className="Checin-label" onClick={e=>handleClear(e)}>check in
                    <div>
                    {checkin}</div> </div>

                    <div className="Checout-label">check out
                    
                    <div>
                    {checkout}</div></div>
                </div>
               { open && <div className="book-slot-sub-2">
                    <table style={{position:'absolute',left:h_left}}>
                    <tbody>
                    <tr>
                        {datee()}

                    </tr>
                    </tbody>

                    </table>

                    
               
                    <div className="left-scroll" onClick={e=>handleScroll("left")}>L</div>
                    <div className="right-scroll"  onClick={e=>handleScroll("right")}>R</div>
                </div>}
      
        </div>
        </Fragment>
    )
}


const Slots = props =>
{   const{onClick=()=>{}}= props;
    const _refDiv = useRef();

    const handleClick=(e)=>{
            let {x,y,width} = _refDiv.current.getBoundingClientRect()
            let offwidth = _refDiv.current.offsetWidth;
            // console.log("The ref is",x,y,width,offwidth )
            onClick(props.myIndex,x,offwidth)
        }

    return(
        <div  onClick={e=>{handleClick(e)}} ref={_refDiv}   className={props.array.includes(props.myIndex)? "slots2 smooth":"slots smooth"}>
                {props.value.time}&nbsp;{props.value.sub}   
                {props.index === props.myIndex && <div style={{width:props.oWidth}} className="slots-overlay"></div>}
                
               
        </div>
    )
}

export default BookSlots;