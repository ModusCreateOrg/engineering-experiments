import { PostObj } from "../../common/components/Post";

type RandomUser = {
  username: string;
  profilePic?: string;
  title?: string;
}

export const RANDOM_USERS: RandomUser[] = [
  {
    username: 'Juno Daly',
    title: 'Founder at Whatever!',
    profilePic: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/53/53bbc7bba6e76afed3380d612572793b8f819292.jpg'
  },
  {
    username: 'Ruqayyah Lott',
    title: 'Co-Founder at Again',
    profilePic: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/de/de3bb9acee39deef86ce1add389985cae46860cd.jpg'
  },
  {
    username: 'Leia Cowan',
    title: 'iOS Engineer',
    profilePic: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/92/92d5cae28b38d31c39ade29b46cb2c2214c93063.jpg'
  }
];

export const POSTS: PostObj[] = [
  {
    username: 'Nataniel Raymond',
    title: 'UI/UX Designer',
    profilePic: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/30/302e9802f7115e25ad7eb36bb1467a777dd95393.jpg',
    media: {
      type: 'image',
      url: 'https://media-exp1.licdn.com/dms/image/C4D22AQFxy4awWQc4mQ/feedshare-shrink_800/0/1643819370257?e=1646870400&v=beta&t=neqJSnMvG3hj6MWlr2fpuKjQu72wpa0_Af8xftQmL8w'
    },
    content: 
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at felis eu lectus placerat dictum ut vel justo. Nullam augue purus, placerat ac pharetra ac, facilisis ac massa. In eu lectus vitae tellus sollicitudin tincidunt. Aliquam mi urna, dapibus ut sodales at, euismod vel nulla. Vestibulum volutpat nibh sit amet tortor porta mattis. Mauris quam mi, auctor ornare ligula in, varius interdum purus. Fusce dictum finibus justo, eget porttitor arcu pretium eget. Aliquam sodales pretium elit imperdiet consectetur. Cras in sodales arcu. Vivamus tristique ligula vitae elit dapibus volutpat.`
  },
  {
    username: 'Ranveer Cross',
    title: 'Software Engineer',
    profilePic: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/21/21dc259f7332d3f6258003ebf4cca9237daad0de.jpg',
    media: {
      type: 'image',
      url: 'https://media-exp1.licdn.com/dms/image/C4D22AQGUZDipsRfmvQ/feedshare-shrink_800/0/1643883384990?e=1646870400&v=beta&t=-x5P0MQzcbQR99_zjeqqPs5JO_IdUfv-zq6a6wcH60M'
    },
    content: 
      `Cras at volutpat nisi.`
  },
  {
    username: 'Everett Morley',
    title: 'Crypto maniac!',
    profilePic: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/44/44a09984482a515f56603a56276948cf8184e769.jpg',
    media: {
      type: 'image',
      url: 'https://media-exp1.licdn.com/dms/image/C4E22AQFHDevHNTBz4Q/feedshare-shrink_800/0/1643466014400?e=1646870400&v=beta&t=bZtqZyP7u1qpIZMJ2PySdh_FJ0VdyNL_fslbDY7VChg'
    },
    content: 
      `Curabitur convallis sit amet orci eu fringilla. Donec gravida nulla ligula, quis dictum nisi tincidunt id. Duis ornare in augue sit amet condimentum.`
  }
];
