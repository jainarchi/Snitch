import React, { useState } from "react";
import Icons from "../../shared/icons/Icons";
import { setPasswordSchema, changePasswordSchema } from "../validation/Password.validator";
import { toast } from "react-toastify";

/*  Password Field  */
function PasswordField({
    id,
    label,
    placeholder = "············",
    value,
    onChange,
}) {
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-[9px] tracking-[0.2em] uppercase text-[#413d38] mb-2
                     font-[family-name:var(--font-sans)]"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full bg-transparent text-[#170c03] text-sm pr-8
                     font-[family-name:var(--font-sans)] placeholder:text-[#d0c5b5]
                     border-0 border-b outline-none py-2 transition-colors duration-300
                     [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                    style={{
                        borderBottomColor: focused ? "#C9A96E" : "#d0c5b5",
                    }}
                />

                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    className="absolute right-0 bottom-2.5 text-[#B5ADA3] hover:text-[#7A6E63]
                     transition-colors duration-200 cursor-pointer"
                    tabIndex={-1}
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    <Icons.eye size={15} />
                </button>
            </div>
        </div>
    );
}

/*  Main Component  */
const PasswordSetting = ({ onSetPassword, onChangePassword }) => {
    const [setPasswordData, setSetPasswordData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [changePasswordData, setChangePasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [mode] = useState("both"); // "set" | "change" | "both"

   

    const handleSetPassword = () => {

        const result = setPasswordSchema.safeParse(setPasswordData);

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        onSetPassword?.(setPasswordData.password);

        setSetPasswordData({
            password: "",
            confirmPassword: "",
        });

    };

    const handleChangePassword = () => {

        const result = changePasswordSchema.safeParse(changePasswordData);

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        onChangePassword?.(
            changePasswordData.currentPassword,
            changePasswordData.newPassword
        )

        setChangePasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });


    };

    return (
        <div className="w-full space-y-16 py-4">

            
            {(mode === "set" || mode === "both") && (
                <section className="w-full">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#181716] font-normal mb-3 leading-snug">
                            Add Manual Credentials
                        </h2>              

                        <p className="text-sm text-[#7A6E63] font-[family-name:var(--font-sans)] max-w-xl mx-auto leading-relaxed">
                           If you joined via Google, you can set a unique password here to enable traditional email & password login for your account.
                        </p>
                    </div>

                    <div className="bg-[#f5f3f0] px-6 sm:px-10 py-10 sm:py-12">
                        <div className="max-w-xs mx-auto space-y-6">

                            <PasswordField
                                id="set-new-password"
                                label="New Password"
                                value={setPasswordData.password}
                                onChange={(e) =>
                                    setSetPasswordData((p) => ({
                                        ...p,
                                        password: e.target.value,
                                    }))
                                }
                            />

                            <PasswordField
                                id="set-confirm-password"
                                label="Confirm New Password"
                                value={setPasswordData.confirmPassword}
                                onChange={(e) =>
                                    setSetPasswordData((p) => ({
                                        ...p,
                                        confirmPassword: e.target.value,
                                    }))
                                }
                            />

                            <div className="pt-4 flex justify-center">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto px-14 py-3.5
                                     bg-[#7A6422] text-[#fbf9f6]
                                     text-[10px] tracking-[0.25em] uppercase
                                     font-[family-name:var(--font-sans)]
                                     hover:bg-[#1b1c1a] transition-all duration-300 cursor-pointer"
                                    onClick={handleSetPassword}
                                >
                                    Set Password
                                </button>
                            </div>
                             
                        </div>
                           <p className="font-body text-[0.7rem] text-snitch-faint m-0 mt-3 text-center">
                Setting a password will not disable your existing social login methods.
              </p>
                    </div>
                </section>
            )}

            {/*  CHANGE PASSWORD  */}
            {(mode === "change" || mode === "both") && (
                <section className="w-full">
                    <div className="text-center mb-8">
                        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#181716] font-normal leading-snug mb-3">
                            Revise Credentials.
                        </h2>
                        <p className='text-sm max-w-xl mx-auto text-[#7A6E63] '>Maintain the security of your profile by updating your password periodically. Ensure your new password is strong, unique, and not used elsewhere.</p>
                    </div>

                    <div className="bg-[#f5f3f0] px-6 sm:px-10 py-10 sm:py-12">
                        <div className="max-w-xs mx-auto space-y-6">

                            <PasswordField
                                id="current-password"
                                label="Current Password"
                                value={changePasswordData.currentPassword}
                                onChange={(e) =>
                                    setChangePasswordData((p) => ({
                                        ...p,
                                        currentPassword: e.target.value,
                                    }))
                                }
                            />

                            <PasswordField
                                id="change-new-password"
                                label="New Password"
                                value={changePasswordData.newPassword}
                                onChange={(e) =>
                                    setChangePasswordData((p) => ({
                                        ...p,
                                        newPassword: e.target.value,
                                    }))
                                }
                            />

                            <PasswordField
                                id="change-confirm-password"
                                label="Confirm New Password"
                                value={changePasswordData.confirmNewPassword}
                                onChange={(e) =>
                                    setChangePasswordData((p) => ({
                                        ...p,
                                        confirmNewPassword: e.target.value,
                                    }))
                                }
                            />

                            <div className="pt-4 flex justify-center">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto px-10 py-3.5
                                     bg-[#7A6422] text-[#fbf9f6]
                                     text-[10px] tracking-[0.25em] uppercase
                                     font-[family-name:var(--font-sans)]
                                     hover:bg-[#1b1c1a] transition-all duration-300 cursor-pointer"
                                    onClick={handleChangePassword}
                                >
                                    Update Credentials
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default PasswordSetting;