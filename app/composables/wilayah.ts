export function useWilayahOptions(state: Ref<any>) {
  // --- Provinsi ---
  const { data: dataProvinsi, status: statusProvinsi } = useFetch(
    `${APIBASE}/options/provinsi`
  );
  const provinsiId = computed(
    () =>
      dataProvinsi.value?.data.find(
        (item) => item.name === state.value.provinsi
      )?.code
  );

  // --- Kabupaten ---
  const {
    data: dataKabupaten,
    status: statusKabupaten,
    execute: fetchKabupaten,
  } = useFetch(() => `${APIBASE}/options/kabupaten/${provinsiId.value}`, {
    immediate: false,
  });
  watch(provinsiId, (val) => val && fetchKabupaten());

  const kabupatenId = computed(
    () =>
      dataKabupaten.value?.data.find((item) => item.name === state.value.kota)
        ?.code
  );

  // --- Kecamatan ---
  const {
    data: dataKecamatan,
    status: statusKecamatan,
    execute: fetchKecamatan,
  } = useFetch(() => `${APIBASE}/options/kecamatan/${kabupatenId.value}`, {
    immediate: false,
  });
  watch(kabupatenId, (val) => val && fetchKecamatan());

  const kecamatanId = computed(
    () =>
      dataKecamatan.value?.data.find(
        (item) => item.name === state.value.kecamatan
      )?.code
  );

  // --- Kelurahan ---
  const {
    data: dataKelurahan,
    status: statusKelurahan,
    execute: fetchKelurahan,
  } = useFetch(() => `${APIBASE}/options/kelurahan/${kecamatanId.value}`, {
    immediate: false,
  });
  watch(kecamatanId, (val) => val && fetchKelurahan());

  return {
    // Provinsi
    dataProvinsi,
    statusProvinsi,
    provinsiId,
    // Kabupaten
    dataKabupaten,
    statusKabupaten,
    kabupatenId,
    // Kecamatan
    dataKecamatan,
    statusKecamatan,
    kecamatanId,
    // Kelurahan
    dataKelurahan,
    statusKelurahan,
  };
}
