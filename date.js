
function date() {

    let options={
        weekday: 'long',
         month:'short' ,
         day:'2-digit'
    }  

    let day = new Date().toLocaleString('en-us', options);
    return day
}

module.exports = date