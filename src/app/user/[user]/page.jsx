import User from "@/components/pages/user/User";
import Header from "@/components/header/Header";
const page = ({ params }) => {
    return (
        <section>
            <Header about />
            <User />
            <p>path: {params.user}</p>
            <button>Đăng xuất</button>
        </section>
    );
};

export default page;
