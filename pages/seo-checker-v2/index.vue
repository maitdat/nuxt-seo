<script setup lang="ts">
import { ref } from 'vue';
import { SeoCheck } from 'seord-vn';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import quillConfig from '~/config/QuillConfig';

// Reactive variables for user input and results
const content = ref({
    title: '',
    htmlText: '',
    keyword: '',
    metaDescription: '',
    subKeywords: ''
});

const result = ref<null | Record<string, any>>(null); // Type-safe result

// Perform SEO analysis
const performAnalysis = async () => {
    const contentJson = {
        title: content.value.title,
        htmlText: content.value.htmlText,
        keyword: content.value.keyword,
        metaDescription: content.value.metaDescription,
        subKeywords: content.value.subKeywords.split(',').map((k) => k.trim()),
        languageCode: 'en',
        countryCode: 'us'
    };

    const seoCheck = await new SeoCheck(contentJson, 'example.com');
    result.value = await seoCheck.analyzeSeo();
};

watch(result, (newResult) => {
    console.log('Result has changed:', newResult);
});

</script>

<template>
    <div>
        <!-- Input Section -->
        <v-card class="mb-4" outlined>
            <v-card-title>SEO Checker</v-card-title>
            <v-card-item>
                <v-textarea v-model="content.title" label="Tiêu đề" outlined rows="2"></v-textarea>
                <div id="editor" class="pb-6">
                    <p for="Nội dung trang"></p>
                    <QuillEditor v-model:content="content.htmlText" :options="quillConfig" class="quill-editor" />
                </div>

                <v-text-field v-model="content.keyword" label="Từ khóa chính" outlined></v-text-field>

                <v-textarea v-model="content.metaDescription" label="Mô tả meta" outlined rows="2"></v-textarea>

                <v-text-field v-model="content.subKeywords" label="Từ khóa phụ (cách nhau bằng dấu phẩy)"
                    outlined></v-text-field>

                <v-btn color="primary" @click="performAnalysis" class="mt-4">
                    Phân tích SEO
                </v-btn>

            </v-card-item>
        </v-card>

        <!-- Result Section -->
        <v-card v-if="result" outlined>
            <v-card-title>Analysis Results</v-card-title>
            <v-card-text>
                <div>
                    <v-alert title="Cảnh báo" color="error" icon="$error" />
                    <v-alert v-for="(warning, index) in result.messages?.warnings" :key="'warning-' + index"
                        color="error" :text="warning" variant="outlined" />
                </div>

                <div>
                    <v-alert title="Điểm tốt" color="success" icon="$success" />
                    <v-alert v-for="(point, index) in result.messages?.goodPoints" :key="'point-' + index"
                        color="success" :text="point" variant="outlined" />
                </div>

                <div>
                    <v-alert title="Cảnh báo nhỏ" color="warning" icon="$warning" />
                    <v-alert v-for="(minorWarning, index) in result.messages?.minorWarnings"
                        :key="'minor-warning-' + index" color="warning" :text="minorWarning" variant="outlined" />
                </div>



                <v-card color="" dark>
                    <v-card-title class="white--text">Chỉ Số SEO</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <strong>Mật độ từ khóa:</strong>
                                <v-chip color="secondary" label>{{ result.keywordDensity }}</v-chip>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Tần suất từ khóa:</strong>
                                <v-chip color="accent" label>{{ result.keywordFrequency }}</v-chip>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Số lượng từ:</strong>
                                <v-chip color="success" label>{{ result.wordCount }}</v-chip>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Tổng số liên kết:</strong>
                                <v-chip color="info" label>{{ result.totalLinks }}</v-chip>
                            </v-col>
                            <v-col cols="12">
                                <strong>Mật độ từ khóa phụ:</strong>
                                <span v-for="(subKeyword, index) in result.subKeywordDensity" :key="index">
                                    <v-chip color="warning" label>
                                        {{ subKeyword.keyword }}: {{ subKeyword.density }}%
                                    </v-chip>
                                </span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>


            </v-card-text>
        </v-card>
    </div>
</template>

<style lang="scss">
#editor {
    .quill-editor {
        min-height: 70vh;
        max-height: 100vh;
        overflow-y: auto;
    }
}
</style>
