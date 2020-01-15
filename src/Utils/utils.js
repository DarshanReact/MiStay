export function windowClick(callBack)
{
    window.addEventListener('click',callBack);
}

export function removeWindowClick(callBack)
{
    window.removeEventListener('click',callBack);
}