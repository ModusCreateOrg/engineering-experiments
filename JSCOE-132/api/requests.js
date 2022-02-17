export const getPictureOfTheDay = async () => {
   const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=joZbunAb7UdEqNv9V6kd7AxvcLuc0XpzjOcBdg0h');
   const json = await res.json();
   return json;
}