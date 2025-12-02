const custommerList = [
    {id:1,
        name: "Thanh",
        address: "123",
        typeCustomer: "Normal"
    },
    {id:2,
        name: "An",
        address: "123QQ",
        typeCustomer: "VIP"
    }
]
export function getAll(){
    return [...custommerList];
}

export function deleteById (id){
    for(let i=0; i<custommerList.length;i++){
        if(custommerList[i].id==id){
            custommerList.splice(i,1);
            break;
        }
    }
}