import UserList from "../components/UserList";

const USER = [
  {
    id: 'u1',
    image: 'https://previews.123rf.com/images/jojjik/jojjik1811/jojjik181100038/113852175-boat-hut-on-braies-lake-with-seekofel-mount-on-background-colorful-autumn-landscape-in-italian-alps-.jpg',
    name: 'Hung Vo',
    places: 3
  }
]

const User = () => {
  
  return (
    <UserList items={USER}/>
   );
}
 
export default User;