export function Login() {
    return (
        <div className="h-screen w-screen flex justify-center items-center ">
            <div className="bg-gray-200 w-80 h-[22rem] rounded-sm p-5">
                <h1 className="text-2xl font-semibold">Login</h1>
                <form className="mt-5 flex flex-col gap-3">
                    <label htmlFor="" className="text-lg">Usuario</label>
                    <input type="text" className="rounded bg-slate-300 p-2 outline-slate-400" />
                    <label htmlFor="" className="text-lg">Senha</label>
                    <input type="password" className="rounded bg-slate-300 p-2 outline-slate-400" />
                    <button type="submit" className="bg-blue-500 text-white p-2 w-32 rounded mx-auto m-5">ENTRAR</button>
                </form>
            </div>
        </div>
    )
}