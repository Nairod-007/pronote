

(async () => {

  const username = "id";
  const password = "password";

  const fs = require('fs');
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch(
    {
        headless: false,
    });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  await page.setViewport({
    width:1080,
    height:5200
  });
  
  await page.goto('https://cas.mon-ent-occitanie.fr/login?service=https:%2F%2F0820883P.index-education.net%2Fpronote%2Feleve.html', {waitUntil:'networkidle2'})

  await page.waitForSelector('.panel__body > .cas__wayf-form > .form__fieldset:nth-child(1) > .form__legend > .btn')
  await page.click('.panel__body > .cas__wayf-form > .form__fieldset:nth-child(1) > .form__legend > .btn')
  
  await page.waitForSelector('.form__fieldset:nth-child(1) > .list-radio > li:nth-child(2) > .cas__wayf-categorie > .form__label')
  await page.click('.form__fieldset:nth-child(1) > .list-radio > li:nth-child(2) > .cas__wayf-categorie > .form__label')
  
  await page.waitForSelector('#button-submit')
  await page.click('#button-submit')
  
  await navigationPromise
  
  await page.waitForSelector('#username')
  const usernameid = await page.$("#username")
  await usernameid.type(username)
  //await page.waitForTimeout(500)
  
  await page.waitForSelector('#password')
  const passwordid = await page.$("#password")
  await passwordid.type(password)
  //await page.waitForTimeout(500)
  
  await page.waitForSelector('#button-submit')
  await page.click('#button-submit')
  
  await navigationPromise
  await page.waitUntil;
  //await page.waitForTimeout(500)
  await page.waitForSelector('#id_79id_34')
  await page.click('#id_79id_34')
  
  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_0_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_0_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.waitForTimeout(500)
  
  //await page.screenshot({path:"img.jpg"})
  var bodyHTML = await page.evaluate(() => document.body.innerHTML);

  fs.writeFile('test.html', bodyHTML, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Fichier écrit avec succès');
  });

  await browser.close()
  
  /*
  //
  //console.log(bodyHTML)
  console.log('-------------------------------------------------------------')

  const note = await page.evaluate(() => {
    document.querySelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_0_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras').innerHTML;
  });
  console.log(note)
  
  
  /*
  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_0_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_0_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_10_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_10_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_22_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_22_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_25_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_25_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_29_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_29_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_32_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_32_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_34_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_34_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_41_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_41_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')

  await page.waitForSelector('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_47_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')
  await page.click('#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_1_47_div > .liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)')

  await page.waitForSelector('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  await page.click('.AlignementHaut > table > tbody > tr:nth-child(1) > .Gras')
  */

})();
