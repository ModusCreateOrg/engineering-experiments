const getGalaxiesAndStars = async function (pgPool) {
    const galaxyRes = await pgPool.query(`select * from galaxy`, []);
    let galaxyList = galaxyRes.rows;
  
    if (galaxyList) {
      const result = await pgPool.query(`select star.name as name, star.id as id, 
              star.galaxy_id as galaxyid, "type" as star_type, "group", brightness, mass from star`, []);
  
      const starList = result.rows;
      const starMap = new Map();
      for (let star of starList) {
        if (starMap.has(star.galaxyid)) {
          const starArray = starMap.get(star.galaxyid);
          starArray.push({ id: star.id, name: star.name, star_type: star.star_type, group: star.group, brightness: star.brightness, mass: star.mass });
          starMap.set(star.galaxyid, starArray);
        } else {
          const starArray = [{ id: star.id, name: star.name, star_type: star.star_type, group: star.group, brightness: star.brightness, mass: star.mass }];
          starMap.set(star.galaxyid, starArray);
        }
      }
      galaxyList = galaxyList.map(galaxy => {
        if (starMap.has(galaxy.id)) {
          stars = starMap.get(galaxy.id);
          galaxy.stars = stars;
        } else {
          galaxy.stars = [];
        }
        return galaxy;
      });
    }
    return galaxyList; 
  }
  module.exports = getGalaxiesAndStars;