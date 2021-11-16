class Clan {
    constructor(name) {
      this.name = name;
    }
  }
  
  const clan = new Clan('Iga');
  
  class Ninja {
    constructor(title) {
      this.title = title;
    }
  
    clanSync() {
        this.clan = clan;
    }

    async clanAsync() {
         this.clan = Promise.resolve(clan);
    }
  }

  function setAndSendNinjas(async, limit) {
    const ninjas = [];
    if (async) {
      for (let i = 0; i < limit; i++) {
        const ninjaItem = new Ninja('Ninja:' + i);
        ninjaItem.clanAsync();
        ninjas.push(ninjaItem);
      }
    } else {
      for (let i = 0; i < limit; i++) {
        const ninjaItem = new Ninja('Ninja:' + i);
        ninjaItem.clanSync();
        ninjas.push(ninjaItem);
      }
    }
    return Promise.resolve(ninjas);
  }


  module.exports = { Clan, Ninja, setAndSendNinjas}