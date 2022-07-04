<template>
  <BaseModal
    :show="showModal"
    @update:show="showModal = showModal ? !showModal : showModal"
  >
    <template #modal-header>
      <span>新增會員資料</span>
    </template>
    <template #modal-text>
      <div class="grid grid-column-3 create-employee-grid">
        <div class="left">
          <div class="flex flex-column">
            <img
              :src="imagePreviewUrl"
              alt="Preview"
              width="110"
              height="110"
            >
            <label for="EmployeePicture">
              <input
                id="EmployeePicture"
                type="file"
                name="EmployeePicture"
                class="form-control-file"
                accept="image/*"
                @change="onPictureChange"
              >
            </label>
          </div>
        </div>
        <div>
          <label for="FirstName">
            First Name
            <input
              id="FirstName"
              v-model="firstName"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="LastName">
            Last Name
            <input
              id="LastName"
              v-model="lastName"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div class="wide">
          <label for="Birth">
            Birth
            <input
              id="Birth"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Email">
            Email
            <input
              id="Email"
              v-model="email"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Gender">
            Gender
            <label for="GenderMale">
              <input
                id="GenderMale"
                v-model="gender"
                type="radio"
                name="gender-male"
                value="male"
              >
              Male
            </label>
            <label for="GenderFemale">
              <input
                id="GenderFemale"
                v-model="gender"
                type="radio"
                name="gender-female"
                value="female"
              >
              Female
            </label>
          </label>
        </div>
        <div>
          <label for="Country">
            Country
            <input
              id="Country"
              v-model="country"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="State">
            State
            <input
              id="State"
              v-model="state"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="City">
            City
            <input
              id="City"
              v-model="city"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Street">
            Street
            <input
              id="Street"
              v-model="street"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Phone">
            Number
            <input
              id="Phone"
              v-model="phone"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div />
        <div>
          <label for="Latitude">
            Coordinates
            <input
              id="Latitude"
              v-model="latitude"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Longitude">
            <input
              id="Longitude"
              v-model="longitude"
              class="form-control"
              type="text"
            >
          </label>
        </div>
      </div>
      <div
        class="flex justify-center items-center"
      >
        <BaseButton
          variant="primary"
          @click="onCreate"
        >
          確定
        </BaseButton>
        <BaseButton
          variant="gary"
          @click="onCancel"
        >
          取消
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import BaseModal from '../BaseModal.vue';
import BaseButton from '../BaseButton.vue';
import useEmployeeService from '../../composables/useEmployeeService';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:show']);

const { createEmployee } = useEmployeeService();

const { show: showModal } = toRefs(props);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const gender = ref('');
const country = ref('');
const state = ref('');
const city = ref('');
const street = ref('');
const phone = ref('');
const latitude = ref('');
const longitude = ref('');
const imagePreviewUrl = ref('');

const onPictureChange = (e) => {
  const file = e.target.files[0];
  imagePreviewUrl.value = URL.createObjectURL(file);
};
const onCreate = () => {
  const data = {
    picture: {
      large: imagePreviewUrl.value,
    },
    name: {
      first: firstName.value,
      last: lastName.value,
    },
    email: email.value,
    gender: gender.value,
    location: {
      country: country.value,
      state: state.value,
      city: city.value,
      coordinates: {
        latitude: latitude.value,
        longitude: longitude.value,
      },
    },
    street: {
      name: street.value,
    },
    cell: phone.value,
  };

  createEmployee(data).then((res) => {
    const { error } = res;

    if (error.value) {
      // notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
    } else {
      emits('update:show', false);
      // notification.value.show('success', '登入成功');
    }
  });
};
const onCancel = () => {
  emits('update:show', false);
};
</script>

<style lang="scss" scoped>
.create-employee-grid {
  grid-template-areas:
    "left . ."
    "left wide wide"
    "left . ."
    "left . ."
    "left . ."
    "left . ."
    "left . .";

  .wide {
    grid-area: wide;
  }

  .left {
    grid-area: left;
  }
}
</style>
