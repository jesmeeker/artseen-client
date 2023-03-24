import { useNavigate } from "react-router-dom"

export const CartSuccess = () => {
    const navigate = useNavigate()
    return (<>
        <section class="container has-text-centered .block">
            <div class="is-size-1 mt-6">
                Thank you for your order.</div>
            <div class="is-size-3 mt-6 pb-6">
                You will receive an email shortly with all the details of your order.
            </div>
        <button class="button is-link is-rounded"
            onClick={() => {
             navigate("/art")}}>
            {`<< Continue Browsing Art`}
        </button>
    </section>
    </>)
}