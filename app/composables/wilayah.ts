export function useWilayah(
  state: Ref<{
    provinsi: string;
    kota: string;
    kecamatan: string;
    kelurahan: string;
  }>,
) {
  const { data: dP, status: sP } = useFetch(`${APIBASE}/options/provinsi`);

  const pId = computed(() => {
    const found = dP.value?.data.find((i) => i.name === state.value.provinsi);
    return found ? found.code : undefined;
  });

  watch(
    () => state.value.provinsi,
    (n, o) => {
      if (n !== o) {
        state.value.kota = "";
        state.value.kecamatan = "";
        state.value.kelurahan = "";
      }
    },
  );

  const {
    data: dKb,
    status: sKb,
    execute: eKb,
  } = useFetch(() => `${APIBASE}/options/kabupaten/${pId.value}`, {
    immediate: false,
  });

  watchEffect(() => {
    if (pId.value) {
      eKb();
    }
  });

  const kbId = computed(() => {
    const found = dKb.value?.data.find((i) => i.name === state.value.kota);
    return found ? found.code : undefined;
  });

  watch(
    () => state.value.kota,
    (n, o) => {
      if (n !== o) {
        state.value.kecamatan = "";
        state.value.kelurahan = "";
      }
    },
  );

  const {
    data: dK,
    status: sK,
    execute: eK,
  } = useFetch(() => `${APIBASE}/options/kecamatan/${kbId.value}`, {
    immediate: false,
  });

  watchEffect(() => {
    if (kbId.value) {
      eK();
    }
  });

  const kId = computed(() => {
    const found = dK.value?.data.find((i) => i.name === state.value.kecamatan);
    return found ? found.code : undefined;
  });

  watch(
    () => state.value.kecamatan,
    (n, o) => {
      if (n !== o) {
        state.value.kelurahan = "";
      }
    },
  );

  const {
    data: dKl,
    status: sKl,
    execute: eKl,
  } = useFetch(() => `${APIBASE}/options/kelurahan/${kId.value}`, {
    immediate: false,
  });

  watchEffect(() => {
    if (kId.value) {
      eKl();
    }
  });

  return {
    dataProvinsi: dP,
    statusProvinsi: sP,
    dataKabupaten: dKb,
    statusKabupaten: sKb,
    dataKecamatan: dK,
    statusKecamatan: sK,
    dataKelurahan: dKl,
    statusKelurahan: sKl,
  };
}
