import { useStateContext } from "../../tools/ContextProvider"

export default function DashBoard(){
    const {user}= useStateContext();


    return(
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4" style={{ height: 100+'vh' }}>
        <h3>Welcome, <em>{user.name}</em></h3>
    </main>
    )
}
