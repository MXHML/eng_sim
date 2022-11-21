var family_select = document.getElementById('family_select');
var engine_select = document.getElementById('engine_select');
var engine_datalist = document.getElementById("engines");
var confirm_btn = document.getElementById("confirm_btn");
var play_area = document.getElementById("play-area");
var engine_area = document.getElementById("engine-area");

let selectedEngine = ''
let engineIndex = 0;
let moddedEngine = [];

family_select.addEventListener('change', ()=>{
    while(engine_datalist.firstChild){
        engine_datalist.removeChild(engine_datalist.lastChild);
    }
    for(let x=0;x<engine_storage.length;x++){
        let createOption = document.createElement("option");
        if(engine_storage[x].family==family_select.value){
            createOption.innerText=engine_storage[x].name;
            engine_datalist.appendChild(createOption);
        }
    }
})

//Async1
confirm_btn.addEventListener('click',()=>{
    let Async1 = new Promise((resolve,reject)=>{
        selectedEngine=engine_select.value;
        engineIndex = engine_storage.map(function(a){return a.name;}).indexOf(selectedEngine)
    
        if(engineIndex>-1){
            resolve("OK")
        } else{
            reject(selectedEngine);
        }
        })
        Async1.then(
        function(value){
            console.log('Async1: Success');
            let temp = document.createElement("div");
            temp.innerHTML = `
            <p>Engine: ${engine_storage[engineIndex].name}</p>
            <p>Family: ${engine_storage[engineIndex].family}</p>
            <p>Type: ${engine_storage[engineIndex].type}</p>
            <p>Displacement: ${engine_storage[engineIndex].displacement}</p>
            <p>Orientation: ${engine_storage[engineIndex].orientation}</p>
            <p>Horsepower: ${engine_storage[engineIndex].horsepower}</p>
            <p>Compression Ratio: ${engine_storage[engineIndex].compression_ratio}</p>
            <p>Bore Center: ${engine_storage[engineIndex].bore_center}</p>
            <p>Engine Mass: ${engine_storage[engineIndex].engine_mass_LBS}</p>
            <p>Valve Config: ${engine_storage[engineIndex].valve_config}</p>
            <p>Valves per Cylinder: ${engine_storage[engineIndex].valves_per_cyliner}</p>
            <p>Firing Order: ${engine_storage[engineIndex].firing_order}</p>
            <p>Bore x Stroke: ${engine_storage[engineIndex].bore_x_stroke}</p>
            <p>Fuel System: ${engine_storage[engineIndex].fuel_system}</p>
            <p>Fuel Type: ${engine_storage[engineIndex].fuel_type}</p>
            <p>Max RPM: ${engine_storage[engineIndex].max_rpm}</p>
            <p>Block Material: ${engine_storage[engineIndex].block_material}</p>
            <p>Cylinder Head Material: ${engine_storage[engineIndex].cylinder_head_material}</p>
            <p>Intake Manifold: ${engine_storage[engineIndex].intake_manifold}</p>
            <button id="confirmEngine_btn">Confirm</button>
            `
            engine_area.appendChild(temp);
            confirmEngine_btn.addEventListener('click',()=>{
                while(engine_area.firstChild){
                    engine_area.removeChild(engine_area.lastChild);
                }
                startGame(engineIndex);
            })
        })})
let firstTurboUpgrade = false;
let dynoTStage1 = false;
function startGame(SelEngineIndex){
    let temp = document.createElement("div");
    moddedEngine = engine_storage[SelEngineIndex];
    temp.innerHTML = `
    <img src=assets/images/generic_engine.jpg width=250 height=250>
    <h2>${moddedEngine.name}<h2>
    <h2>HP:${moddedEngine.horsepower}<h2>
    <h2>Displacement:${moddedEngine.displacement}<h2>
    <input type=search id=upgrade_turbo list=turbo_options></input>
    <datalist id=turbo_options>
        <option value="Stage 1">Install</option>
        <option value="Stage 2">Install</option>
    </datalist>
    <button id=dyno_btn>Dyno!</button>
    `
    engine_area.appendChild(temp);
    document.getElementById("upgrade_turbo").addEventListener("change",()=>{
        turboUpgrade(engineIndex)
    })
    document.getElementById("dyno_btn").addEventListener("click",()=>{
        dynoTStage1=true;
        turboUpgrade(engineIndex);
    })
}
let SelfIndex = engineIndex
function turboUpgrade(){

console.warn('TURBO UPGRADE')

firstTurboUpgrade = true;

if(dynoTStage1==false){
    moddedEngine.horsepower=moddedEngine.horsepower+70;
}else{
    moddedEngine.horsepower=moddedEngine.horsepower+150;
}

console.log(`SELF INDEX:${SelfIndex}`)

clearDiv(engine_area)

startGame(SelfIndex);
}

function clearDiv(divId){
    while(divId.firstChild){
        divId.removeChild(divId.lastChild)
    }
}