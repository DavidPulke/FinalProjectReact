import { FunctionComponent, useEffect, useRef, useState } from "react";
import { User } from "../interfaces/User";
import { deleteUser, getAllUsers, searchUsers } from "../services/usersService";
import CustomPagination from "./tools/CustomPagination";
import { useUser } from "../hooks/useUser";
import { successMsg } from "../services/feedbackService";

interface CrmProps {

}

const Crm: FunctionComponent<CrmProps> = () => {
    let [users, setUsers] = useState<User[]>([]);
    let { payload } = useUser()
    let [flag, setFlag] = useState<boolean>(false)
    let [isLoading, setisLoading] = useState<boolean>(true)
    let searchType = useRef<HTMLSelectElement>()

    useEffect(() => {
        getAllUsers().then((res) => {
            setisLoading(true)
            setUsers(res.data);
        }).catch((err) => console.log(err)
        )
    }, [flag]);

    // Pagenation
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);


    const handleDeleteUser = (userId: string) => {
        if (prompt("Are you sure, you want to DELETE this user? if you are positive about it please type 'yes' in the input below") == 'yes') {
            deleteUser(userId).then(() => {
                successMsg("user as been DELETED successfuly!");
                setFlag(!flag)
            }).catch((err) => console.log(err)
            )
        } else {
            alert("you did not typed 'YES' Therefor the user Stays ")
        }
    }

    const handleSearch = async (querry: string) => {
        try {
            let filteredUsers = await searchUsers(querry.toLowerCase(), searchType.current?.value as string)
            if (filteredUsers != undefined) {
                setUsers(filteredUsers[0] as any)
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (<section className=" text-center">
        <h1 ><span className="logo">CRM</span> |  <span className="logo">Control Panel</span></h1>
        <form className="d-flex form-search gap-2" role="search">
            <div className="search-wraper m-auto mt-2">
                <input
                    className="form-control "
                    type="search"
                    placeholder="Search Users"
                    aria-label="Search"
                    datatype={searchType.current?.value}

                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />

                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </form>
        <select className="searchType" ref={searchType as any}>
            <option value="name">By Name</option>
            <option value="email">By Email</option>
            <option value="country">By Country</option>
            <option value="city">By City</option>
        </select>

        <div className="topPageNav mt-5">< CustomPagination
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
        /></div>


        <h3>Users</h3>
        {isLoading && <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>}

        <div className="cards">
            {currentUsers.length > 0 && currentUsers.map((user) => {
                return <div className="card" key={user._id}>
                    <div className="cardTools">
                        {payload.isAdmin && <i className="fa-regular fa-trash-can text-danger" onClick={() => handleDeleteUser(user._id as string)}></i>}
                    </div>
                    <img src={user.image.url} alt={user.image.alt} title={`${user.name.first} ${user.name.last}`} onError={(e) => {
                        e.currentTarget.src = 'Images/DefaultUserImage.png'
                    }} />

                    <div className="card-data">
                        <h4><strong>name:</strong> {`${user.name.first} ${user.name.last}`}</h4>
                        <h5><strong>country:</strong> {user.address.country}</h5>
                        <hr />
                        <p><strong>city:</strong> {user.address.city}</p>
                        <p><strong>email:</strong> {user.email}</p>
                        <p><strong>isBusiness:</strong> {user.isBusiness ? <>Yes</> : <>No</>}</p>
                    </div>
                </div>
            })}
        </div>

        < CustomPagination
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </section>);
}

export default Crm;