
const finishLoaded = (callback) => { document.addEventListener('DOMContentLoaded', async() =>  { await callback(); } );};
const elementApp = document.querySelector('#app');

const element = (siteId, siteName, siteUrl, subData) => {
 return `
  <div class="element">
    Id:${siteId}<br>
    Site Name:${siteName}<br>
    <a href="${siteUrl.includes('://') ? siteUrl : 'http://' + siteUrl}" target="_blank">SiteUrl:${siteName}</a><br>
    ${subData}
  </div>
 `;
}; 

const jsonToElement = (results) => {     //recursion
  let elements = '';
  try{
    for(let i = 0; i < results.length; ++i){
      const el = results[i];
      let internalElements ='';
      if(el.subData) internalElements = jsonToElement(el.subData);
      elements += element(el.id, el.name, el.url, internalElements) ;
    }
  }catch(e){console.log('element error: ', e)}
  return elements;
};


 const loadElements = async() => {
  try{
    const data = await fetch('./data.json');
    if(data.ok == false) throw new Error('no data file url');
    const results = await data.json();
    console.log(results);
    let total = jsonToElement(results);
    elementApp.innerHTML = total;
  } catch(e){
    console.log('error: ' + e.message);
    elementApp.innerHTML = 'Parsing error, please enter right json file value.';
  }
};

finishLoaded(async() => {
    await loadElements();
});