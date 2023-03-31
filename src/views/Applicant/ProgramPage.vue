<template>
    <div class="container mt-4">
        <img src="https://www.w3schools.com/w3images/workbench.jpg" class="background_image">
        <div class="program_header mt-3">
            <p class="is-size-2">โครงการ ...</p>
            <p class="is-size-4 mt-3">โดย ...</p>
        </div>
        <div class="program_description">
            <p class="is-size-5">THiNKNET คือ บริษัท IT
                ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ
                JobThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี
                นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET
                Design Studio</p>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">หลักสูตรการฝึกงาน</p>
            <p class="ml-6 mt-3">โครงการ Growing with AIS (GA)
                เป็นโครงการฝึกงานในภาคฤดูร้อน ระหว่างเดือนมิถุนายน - กรกฎาคม
                เพื่อส่งเสริมให้นิสิต/นักศึกษามีความคิดริเริ่มสร้างสรรค์
                และเสริมสร้างประสบการณ์การทำงานเป็นทีมผ่านกิจกรรมกลุ่มพิเศษ ตลอดจนการปลูกฝังจิตสำนึกเรื่องบรรษัทภิบาล
                จรรยาบรรณในการทำงานเพื่อเตรียมความพร้อมสำหรับการทำงานและพัฒนาประเทศชาติต่อไป
                <br>
                <br>
                โครงการสหกิจศึกษา (Co-operative Education Program)
                เป็นการส่งเสริมความสัมพันธ์และความร่วมมืออันดีระหว่างบริษัทฯ กับสถาบันการศึกษา
                เพื่อเปิดโอกาสให้นิสิต/นักศึกษาได้เรียนรู้ประสบการณ์จากการปฏิบัติงานจริง
                โดยเน้นให้นำเอาวิชาการทั้งภาคทฤษฎีและปฏิบัติที่ได้ศึกษานั้น นำมาปฏิบัติงานอย่างมีประสิทธิภาพ อีกทั้ง
                ยังเป็นการสร้างเสริมกระบวนการคิดวิเคราะห์ การตัดสินใจกับเหตุการณ์ที่พบเจอและฝึกการสังเกต
                ซึ่งเป็นโอกาสดีที่นิสิต/นักศึกษาจะค้นพบศักยภาพที่แท้จริง
                อาชีพที่สนใจและเป็นบัณฑิตที่มีคุณภาพตรงตามต้องการของตลาดแรงงาน โดยมีระยะเวลาของโครงการฯ 1 ภาคการศึกษา
            </p>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">ตำแหน่งที่เปิดรับ</p>
            <ul class="ml-6 mt-3">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
            </ul>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">คุณสมบัติ</p>
            <ul class="ml-6 mt-3">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
            </ul>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">สิทธิประโยชน์</p>
            <ul class="ml-6 mt-3">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
            </ul>
        </div>
        <div class="columns mt-6 submit_button">
            <button class="button column is-6 m-3 is-success is-medium">ยืนสมัตร</button>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        return {
            router,
            route
        }
    },
})
</script>

<style scoped>
.background_image {
    width: 100%;
    height: 500px;
}

.program_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.program_description {
    margin-top: 6rem;
}

.program_info_display {
    margin-top: 5rem;
    width: 80%;
}

.submit_button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


</style>
