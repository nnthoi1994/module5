
const footballerList = [
    {
        id: 1,
        code: "C001",
        name: "Thới",
        dob: "1987-06-24",
        value: 50000000,
        position: "Tiền đạo"
    },
    {
        id: 2,
        code: "C002",
        name: "Thành",
        dob: "1995-02-05",
        value: 40000000,
        position: "Tiền đạo"
    },
    {
        id: 3,
        code: "C003",
        name: "An",
        dob: "2002-06-28",
        value: 70000000,
        position: "Tiền vệ"
    }
];


export function getAll() {
    return [...footballerList];
}


export function addNew(footballer) {
    const maxId = footballerList.length > 0 ? Math.max(...footballerList.map(f => f.id)) : 0;
    footballer.id = maxId + 1;
    footballerList.push(footballer);
}


export function deleteById(id) {
    for (let i = 0; i < footballerList.length; i++) {
        if (footballerList[i].id == id) {
            footballerList.splice(i, 1);
            break;
        }
    }
}


export function searchByName(name) {
    if (!name) return [...footballerList];
    return footballerList.filter(player =>
        player.name.toLowerCase().includes(name.toLowerCase())
    );
}

export function findById(id) {
    return footballerList.find(p => p.id === parseInt(id));
}

export function update(footballer) {
    const index = footballerList.findIndex(p => p.id === parseInt(footballer.id));
    if (index !== -1) {
        footballerList[index] = footballer;
    }
}   