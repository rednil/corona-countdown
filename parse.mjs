import fs from 'fs'
fs.readFile('impf.csv', 'utf8', (err, csv) => {
    if (err) throw err
    const lines = csv.split('\n')
    const entries = []
    let total
    lines.slice(1).forEach(line => {
      try{
        const data = line.split(',')
        if(data[0].match(/\d\d\d\d-\d\d-\d\d/)) entries.push([data[0], Number(data[1]), Number(data[2])])
        if(data[0].match(/gesamt/)) total = [Number(data[1]), Number(data[2])]
      }catch(e){}
    })
    if(entries.length < 10) throw 'Faulty data, quitting'
    fs.readFile('template.html', 'utf8', (err, template) => {
        const index = template.replace('/* ### DATA ### */', JSON.stringify({entries, total}))
        fs.writeFile('index.html', index, () => {
          console.log(`Data successfully parsed. Last entry: ${entries[entries.length-1][0]}`)
        })
    })
})
