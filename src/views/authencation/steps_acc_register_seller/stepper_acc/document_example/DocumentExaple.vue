<template>
   <div class="px-2 py-2">
        <div class="title">
            <h4>Certificate photo upload <span class="p-error">*</span></h4>
        </div>
         <h4>National ID Card</h4>
         <el-row :gutter="12">
            <!-- Nation IDs -->
            <el-col :span="4">
               <el-card :body-style="{ padding: '0px' }">
                    <img
                        src="https://s3.eu-central-1.amazonaws.com/trengo/media/hc_m_XVF9TSlH42xkJakqtTWhKwJ1NAvoZg.jpg"
                        class="image"
                    />
                </el-card>
            </el-col>
            <el-col :span="5">
                <el-card :body-style="{ padding: '0px' }">
                    <img
                        src="https://thumbs.dreamstime.com/b/id-card-white-background-business-identification-icon-identity-template-badge-personal-contact-78370022.jpg"
                        class="image"
                    />
                </el-card>
            </el-col>
              <el-col :span="4">
                    <el-card :body-style="{ padding: '0px' }">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJZ5MLIanlvLtoZfTFUZBG2QlhNb3DboQgA&usqp=CAU"
                            class="image"
                        />
                    </el-card>
                </el-col> 
        </el-row>
        <!--Passports-->
        <h5>Passport No:</h5>
        <el-row :gutter="12">
            <el-col :span="5">
                    <el-card :body-style="{ padding: '0px' }">
                        <img
                            src="https://media.istockphoto.com/id/1057970590/vector/international-male-passport-template-with-photo-vector-illustration.jpg?s=612x612&w=0&k=20&c=GVGC12dac9-r1Mfn2tSEQyEMe7bCqUjL8yNL3OM5-y8="
                            class="image"
                        />
                    </el-card>
            </el-col>
            <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }">
                        <img
                            src="https://cdn.dribbble.com/users/289900/screenshots/4610643/selfie1.jpg"
                            class="image"
                        />
                    </el-card>
            </el-col>
        </el-row>
        <!--Driver License-->
        <h5>Driver License:</h5>
        <el-row :gutter="12">
            <el-col :span="5">
                <el-card :body-style="{ padding: '0px' }">
                    <img
                        src="https://thumbs.dreamstime.com/b/driver-licence-icon-id-card-vector-license-drive-identity-photo-identification-194999635.jpg"
                        class="image"
                    />
                </el-card>
            </el-col>
            <el-col :span="5">
                <el-card :body-style="{ padding: '0px' }">
                    <img
                        src="https://help.vernalweb.com/wp-content/uploads/2021/08/selfie-1.png"
                        class="image"
                    />
                </el-card>
            </el-col>
        </el-row>
   </div>
</template>



<style>
.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>