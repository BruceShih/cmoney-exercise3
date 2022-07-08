<template>
  <BaseModal
    class="create-modal"
    :show="showModal"
    header-text-class="text--white"
    header-bg-class="bg--gray"
    @update:show="onCancel"
  >
    <template #modal__header>
      <span>新增會員資料</span>
    </template>
    <template #modal-text>
      <div class="grid grid-column-3 create-employee-grid">
        <div class="left">
          <div class="flex flex-col">
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
            <span class="form-label">First Name</span>
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
            <span class="form-label">Last Name</span>
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
            <span class="form-label">Birth</span>
            <input
              id="Birth"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Email">
            <span class="form-label">Email</span>
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
            <span class="form-label">Gender</span>
            <div class="flex justify-start items-center form-radio-group">
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
                  class="ml-3"
                  type="radio"
                  name="gender-female"
                  value="female"
                >
                Female
              </label>
            </div>
          </label>
        </div>
        <div>
          <label for="Country">
            <span class="form-label">Country</span>
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
            <span class="form-label">State</span>
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
            <span class="form-label">City</span>
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
            <span class="form-label">Street</span>
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
            <span class="form-label">Number</span>
            <input
              id="Phone"
              v-model="phone"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div />
        <div class="wide2">
          <div class="flex w-100">
            <span class="form-label">Coordinates</span>
          </div>
          <div class="flex w-100">
            <label
              class="flex-grow mr-2"
              for="Latitude"
            >
              <input
                id="Latitude"
                v-model="latitude"
                class="form-control"
                type="text"
              >
            </label>
            <label
              class="flex-grow ml-2"
              for="Longitude"
            >
              <input
                id="Longitude"
                v-model="longitude"
                class="form-control"
                type="text"
              >
            </label>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center mt-4"
      >
        <BaseButton
          class="mr-2"
          variant="primary"
          @click="onCreate"
        >
          確定
        </BaseButton>
        <BaseButton
          variant="gray"
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
import { useEventBus } from '@vueuse/core';
import BaseButton from '../BaseButton.vue';
import BaseModal from '../BaseModal.vue';
import useEmployeeService from '../../composables/useEmployeeService';

const { emit } = useEventBus('notification-show');
const { emit: employeeEmit } = useEventBus('employee-create');
const { createEmployee } = useEmployeeService();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:show']);

const { show: showModal } = toRefs(props);
const newEmployee = ref({
  id: 0,
  gender: '',
  name: {
    title: '',
    first: '',
    last: '',
  },
  location: {
    street: {
      number: 0,
      name: '',
    },
    city: '',
    state: '',
    country: '',
    postcode: '',
    coordinates: {
      latitude: '',
      longitude: '',
    },
    timezone: {
      offset: '',
      description: '',
    },
  },
  email: '',
  login: {
    uuid: '',
    username: '',
    password: '',
    salt: '',
    md5: '',
    sha1: '',
    sha256: '',
  },
  dob: {
    date: '',
    age: 0,
  },
  registered: {
    date: '',
    age: 0,
  },
  phone: '',
  cell: '',
  picture: {
    large: '',
    medium: '',
    thumbnail: '',
  },
  nat: '',
});
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
  const reader = new FileReader();
  reader.onload = (event) => {
    imagePreviewUrl.value = event.target.result;
  };
  reader.readAsDataURL(file);
};
const onCreate = () => {
  newEmployee.value.picture.large = imagePreviewUrl.value;
  newEmployee.value.picture.medium = imagePreviewUrl.value;
  newEmployee.value.picture.thumbnail = imagePreviewUrl.value;
  newEmployee.value.name.first = firstName.value;
  newEmployee.value.name.last = lastName.value;
  newEmployee.value.email = email.value;
  newEmployee.value.gender = gender.value;
  newEmployee.value.location.country = country.value;
  newEmployee.value.location.state = state.value;
  newEmployee.value.location.city = city.value;
  newEmployee.value.location.coordinates.latitude = latitude.value;
  newEmployee.value.location.coordinates.longitude = longitude.value;
  newEmployee.value.location.street.name = street.value;
  newEmployee.value.cell = phone.value;
  newEmployee.value.nat = country.value;

  createEmployee(newEmployee.value).then((res) => {
    const { error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '建立失敗！' });
    } else {
      emits('update:show', false);
      employeeEmit(true);
      emit({ type: 'success', text: '建立成功' });
    }
  });
};
const onCancel = () => {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  gender.value = '';
  country.value = '';
  state.value = '';
  city.value = '';
  street.value = '';
  phone.value = '';
  latitude.value = '';
  longitude.value = '';
  imagePreviewUrl.value = '';
  emits('update:show', false);
};
</script>

<style lang="scss" scoped>
.create-employee-grid {
  max-width: 45rem;
  grid-template-areas:
    "left . ."
    "left wide wide"
    "left . ."
    "left . ."
    "left . ."
    "left . ."
    "left wide2 wide2";

  .wide {
    grid-area: wide;
  }

  .wide2 {
    grid-area: wide2;
  }

  .left {
    grid-area: left;
  }
}
</style>
