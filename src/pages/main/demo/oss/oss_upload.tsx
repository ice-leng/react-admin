import { IconUpload } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { memo, useState } from "react";
import OSS from "./oss";

const OssUpload = memo(({
    max = 4,
}: {
    max?: number,

}) => {
    const [list, updateList] = useState<String[]>([]);

    const onChange = () => {
        document.getElementById("pro_upload")?.click();
    };

    return <div>
        {
            max === list.length ? null : <Button
                icon={<IconUpload />}
                theme="light"
                onClick={onChange}
            >
                点击上传
            </Button>
        }
        <input
            id="pro_upload"
            style={{ display: 'none' }}
            accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
            type='file'
            placeholder=""
            autoComplete="off"
            onChange={(e) => {
                if (e.currentTarget.files) {
                    const file = e.currentTarget.files[0]
                    console.log(file);
                    OSS.upload(file).then(res => {
                        if (res) {
                            console.log(res);
                            updateList([...list, res])
                        }
                    })
                }

            }}>
        </input>
    </div>
})
export default OssUpload