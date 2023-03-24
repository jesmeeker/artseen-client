import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSinglePiece } from "../../managers/Art"
import { createNewPayment } from "../../managers/Cart"

export const PaymentAddModal = ({ getAllUserPayments, setPayments }) => {
    const merchant_name = useRef()
    const account_number = useRef()
    const expiration_date = useRef()
    const zip_code = useRef()

    const navigate = useNavigate()

    const handleSubmit = (e) => {

        const newPayment = {
            merchant_name: merchant_name.current.value,
            account_number: account_number.current.value,
            expiration_date: expiration_date.current.value,
            zip_code: zip_code.current.value
        }

        createNewPayment(newPayment).then(() => {
            getAllUserPayments()
            closeAllModals()
        })
    }

    const closeModal = ($el) => {
        $el.classList.remove('is-active')
            ;
    }
    const closeAllModals = () => {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    return <>
        <div class="modal-content">

            <div className="art__container">
                <div class="tile is-ancestor box">
                    <div className=".container">

                        <h1 className="title">Viewer Registration</h1>
                        <p className="subtitle">Create an account</p>
                        <div className="field-body">
                            <div className="field-body">
                                <label className="label" width>Merchant Name</label>
                            </div>

                        </div>
                        <div className="field">
                            <div className="control is-expanded">
                                <div className="field-body">
                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Merchant Name"
                                                ref={merchant_name}
                                            />
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Account Number</label>
                            <div className="field-body">
                                <textarea
                                    className="input"
                                    placeholder="Account Number"
                                    ref={account_number}
                                ></textarea>
                            </div>
                        </div>

                        <div className="field-body">
                            <div className="field-body">
                                <label className="label" width>Expiration Date</label>
                            </div>
                            <div className="field-body">
                                <label className="label">Zip Code</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control is-expanded">
                                <div className="field-body">
                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Expiration Date"
                                                ref={expiration_date}
                                            />
                                        </p>
                                    </div>

                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Zip Code"
                                                ref={zip_code}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="button is-link is-rounded is-small is-light"
                            onClick={() => {
                                handleSubmit()
                            }}>
                            Save Payment
                        </button>


                    </div>
                </div>
            </div>


        </div>
    </>
}
