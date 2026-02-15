import { Button, Popconfirm } from "antd"

import type { ReactNode } from "react"
import {CiEdit} from "react-icons/ci";
import {GoQuestion} from "react-icons/go";
import {MdDeleteOutline} from "react-icons/md";

interface ExtraButtonProps<T> {
    onClick: (id: number, record: T) => void
    allowClick?: boolean
    icon: ReactNode
}

export interface ITableManagement<T> {
    onEdit?: (id: number | string, record: T) => void
    onDelete?: (id: number | string, record: T) => void
    allowDelete?: (
        id: number | string,
        record: T,
    ) => boolean
    allowEdit?: (id: number | string, record: T) => boolean

    extraButtons?: ({
        row,
    }: {
        row: T
    }) => ExtraButtonProps<T>[]
}

interface ITableManagementProps<
    T,
> extends ITableManagement<T> {
    value: number
    record: T
}

function TableManagement<T>({
    allowEdit,
    allowDelete,
    onEdit,
    onDelete,
    value,
    record,
    extraButtons,
}: ITableManagementProps<T>) {
    return (
        <div className={"flex w-full justify-end gap-2"}>
            {extraButtons && (
                <>
                    {extraButtons({ row: record }).map(
                        (
                            { onClick, allowClick, icon },
                            i,
                        ) => (
                            <Button
                                key={i}
                                disabled={
                                    allowClick ?? true
                                }
                                type={"text"}
                                onClick={() =>
                                    onClick(value, record)
                                }
                                icon={icon}
                            ></Button>
                        ),
                    )}
                </>
            )}

            {onEdit && (
                <>
                    <Button
                        disabled={
                            !(allowEdit
                                ? allowEdit(value, record)
                                : true)
                        }
                        type={"text"}
                        onClick={() =>
                            onEdit(value, record)
                        }
                        icon={<CiEdit />}
                    ></Button>
                </>
            )}

            {onDelete && (
                <>
                    <Popconfirm
                        title="Silinsin?"
                        description="Bu əməliyyat geri qaytarılmır."
                        onConfirm={() =>
                            onDelete(value, record)
                        }
                        icon={
                             <GoQuestion
                                style={{ color: "red" }}
                            />
                        }
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button
                            disabled={
                                !(allowDelete
                                    ? allowDelete(
                                          value,
                                          record,
                                      )
                                    : true)
                            }
                            danger={true}
                            type={"text"}
                            icon={<MdDeleteOutline />}
                        ></Button>
                    </Popconfirm>
                </>
            )}
        </div>
    )
}

export default TableManagement
