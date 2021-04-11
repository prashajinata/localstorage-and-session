import React from "react"
import $ from "jquery"

class Cart extends React.Component {
    constructor(){
        super()
        this.state = {
            cart: [], //untuk menyimpan listen   cart
            user: "", //untuk menyimpan data nama user
            total: 0, //untuk menyimpan data total belanja
            selectedItem: null
        }
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        // memanggil data user pada localStorage
        let userName = localStorage.getItem("user")

        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += item.harga * item.jumlahBeli
        })

        // memasukkan data cart dan user, serta total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }

    editCart = (item) => {
        // mengedit komponen modal
        $("#modal_cart").modal("show")
        this.setState({
            isbn: item.isbn,
            jumlahBeli: item.jumlahBeli,
            action: "update",
            selectedItem: item
        })
    }

    Save = (event) => {
        event.preventDefault();
        let tempCart = this.state.cart
        if(this.state.action === "update") {
            let index = tempCart.findIndex(item => item.isbn === this.state.isbn)
             tempCart[index].jumlahBeli = this.state.jumlahBeli
        }
        this.setState({cart : tempCart})

        // simpan perubahan data pada local storage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        this.initCart();

        // menutup komponen modal_cart
        $("#modal_cart").modal("hide")
    }

    componentDidMount(){
        this.initCart()
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apa anda yakin menghapus data ini ?")) {
            // menghapus data
            let tempCart = this.state.cart

            // posisi index data yg akan dihapus
            let index = tempCart.findIndex(item => item.isbn === this.state.isbn)

            // hapus data
            tempCart.splice(index, 1)

            this.setState({cart : tempCart})

            // simpan perubahan data pada local storage
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }
    
    componentDidMount(){
        this.initCart()
    }

    render(){
        return(
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data keranjang</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Nama User: { this.state.user }
                        </h5>

                        <table className="table table-border">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                { this.state.cart.map( (item, index) =>(
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>{item.jumlahBeli}</td>
                                        <td>
                                            Rp { item.harga * item.jumlahBeli}
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary m-1"
                                            onClick={() => this.editCart(item)} data-toggle="modal" data-target="#modal_cart">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.Drop(item)}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4 className="text-danger">
                            Total Harga: Rp {this.state.total}
                        </h4>
                    </div>
                </div>

                {/* component modal sebagai control manipulasi data */}
                <div className="modal" id="modal_cart">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Cart
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Jumlah Beli
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.jumlahBeli}
                                    onChange={ev => this.setState({jumlahBeli: ev.target.value})}
                                    required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;